// SkyWayのシグナリングサーバーへ接続する (APIキーを置き換える必要あり）
//var peer = new Peer({ key: '3fe45e9c-4406-41e7-a3db-0b45be57420c', debug: 3});

var multiparty;
var myID;
var videoCount = 1;
var myCnt = 0;
var myTim = 0;
var allUserID =[];

function start(){

    //Multiparty インスタンス
    multiparty = new MultiParty({
        "key":"3fe45e9c-4406-41e7-a3db-0b45be57420c",
        "reliable":true,
        // "debug":3
    });

    //for MediaStream
    multiparty.on('my_ms',function(video){
        //自分のvideoを表示
        var vNode = MultiParty.util.createVideoNode(video);
        vNode.volume = 0;
        $(vNode).appendTo('#streams01');
        myidPost();
    }).on('peer_ms', function(video){
        //peerのvideoを表示
        var vNode = MultiParty.util.createVideoNode(video);
        $(vNode)
            .appendTo('#streams02')
            .wrap('<div class=video' + videoCount + '" />');
        videoCount++;
        if(videoCount == 4){
            getAllUser();
        }
    }).on('ms_close', function(peer_id){
        //peerが切れたら、対象のvideoノードを削除する
        $('#'+peer_id).remove();
        videoCount--;
    })
    //for MediaStream
    // multiparty.on('peer_ms', function(video){
    //     //peerのvideoを表示
    //     var vNode = MultiParty.util.createVideoNode(video);
    //     $(vNode).appendTo('#streams');
    // }).on('ms_close', function(peer_id){
    //     //peerが切れたら、対象のvideoノードを削除する
    //     $('#'+peer_id).remove();
    // })

    ////////////////////////////////
    // for DataChannel
    multiparty.on('message', function(mesg) {
        // peerからテキストメッセージを受信
        $("p.receive").append(mesg.data + "<br>");
    });


    multiparty.start();

    getJson();

    countDown();

}

function getAllUser(){
    $('video').each(function(){
        allUserID.push($(this).attr('id'));
    });
}

function getJson(){
    $.getJSON("https://219.94.241.84/api/word.php", function(data){
        console.log(data);

    });
}

function myidPost(){
    //自分のIDをポストする
    myID = $('#streams01 video').attr("id");
    $.ajax({
        url: 'user.php',
        type:'POST',
        dataType: 'json',
        data : {id : myID },
        timeout:10000,
        // success: function(data) {
        //     alert("ok");
        // },
        // error: function(XMLHttpRequest, textStatus, errorThrown) {
        //     alert("error");
        // }
    });
}

function countDown(){
    // $('#countdown').removeClass()
    myCnt = 5;
    myTim = setInterval("myTimer()",1000);
};

function myTimer(){
    myCnt = myCnt - 1;
    document.getElementById( "countdown" ).innerHTML = convertToTime(myCnt);
    if ( myCnt == 0 ){
        clearInterval( myTim );
        sweetAlert({
            title:"タイムアップ！！",
            text:"少数派だと思う方を選択してください"
        });
    }
};
function convertToTime(time = null) {
    var minute = time / 60;
    var second = time % 60;
    second = ( "00" + second ).substr(-2)
    return Math.floor(minute) + '分' + second + '秒';
};

$(function (){
    $('form > div#streams02 *').on('click',function(){
        //少数派（予想）のIDを取得
        var forecastID = $(this).find('video').attr('id');
        var data = forecastID;
        multiparty.send(data);
        console.log(forecastID);

    });


    // $('#audio-mute').on('click',function(e){
    //     var mute = !$(this).data('muted');
    //     multiparty.mute({audio: mute});
    //     $(this).text("audio " + (mute ? "unmute" : "mute")).data("muted", mute);
    // });

});

start();

