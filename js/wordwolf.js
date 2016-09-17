// SkyWayのシグナリングサーバーへ接続する (APIキーを置き換える必要あり）
//var peer = new Peer({ key: '3fe45e9c-4406-41e7-a3db-0b45be57420c', debug: 3});

var multiparty;
var myID;
var videoCount = 1;
var answerCount = 0;
var myCnt = 0;
var myTim = 0;
var allUserID =[];
var allAnswer = [];

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
        //myidPost();
    }).on('peer_ms', function(video){
        //peerのvideoを表示
        var vNode = MultiParty.util.createVideoNode(video);
        $(vNode)
            .appendTo('#streams02')
            .wrap('<div class=video' + videoCount + '" />');
        videoCount++;
        if(videoCount == 4){
            getAllUser();
            getJson();
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
        $("div.hidden").append('<div id="' + mesg.data + '"></div>');
        //全回答のID取得
        allAnswerPost();
    });


    multiparty.start();

<<<<<<< HEAD
    $('#audio-mute').on('click',function(e){
        var mute = !$(this).data('muted');
        multiparty.mute({audio: mute});
        $(this).text("audio " + (mute ? "unmute" : "mute")).data("muted", mute);
    });
=======
    getJson();

    countDown();
>>>>>>> 7ebad65402762390431a32019f1fc70fdfd1d1df

    //countDown();
}

function getAllUser(){
    $('video').each(function(){
        allUserID.push($(this).attr('id'));
    });
}

function getJson(){
    myID = $('#streams01 video').attr("id");
    //console.log(myID);
    $.getJSON("https://219.94.241.84/api/word.php", function(data){
        //var list = getAllUser();
        allUserID.sort(function(a, b){
            if( a < b ) return -1;
            if( a > b ) return 1;
            return 0;
        });

        var key = $.inArray(myID, allUserID);
        if (key == data[2]) {
            word = data[1];
        } else {
            word = data[0];
        }
        sweetAlert({
            title:"あなたのお題は「"+word+"」です",
            },
            function () {
                countDown();
            }
        );
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
    return '<span class="number">' + Math.floor(minute) + '</span><span class="text">分</span><span class="number">' + second + '</span><span class="text">秒</span>';
};

function allAnswerPost(){
    if($('div.hidden > div').length == 4){
        $('div.hidden > div').each(function(){
            allAnswer.push($(this).attr('id'));
        });
    }
};


<<<<<<< HEAD
=======
$(function (){
    $('form > div#streams02').on('click','video',function(){
        if(answerCount == 0){
            //少数派（予想）のIDを取得
            var forecastID = $(this).attr('id');
            var data = forecastID;
            multiparty.send(data);
            $("div.hidden").append('<div id="' + data + '"></div>');
            answerCount++;
            //全回答のID取得
            allAnswerPost();
        }
    });


    // $('#audio-mute').on('click',function(e){
    //     var mute = !$(this).data('muted');
    //     multiparty.mute({audio: mute});
    //     $(this).text("audio " + (mute ? "unmute" : "mute")).data("muted", mute);
    // });

});

>>>>>>> 7ebad65402762390431a32019f1fc70fdfd1d1df
start();

$(window).on("load",function(){
    //do something
    //getJson()
});