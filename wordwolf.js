// SkyWayのシグナリングサーバーへ接続する (APIキーを置き換える必要あり）
//var peer = new Peer({ key: '3fe45e9c-4406-41e7-a3db-0b45be57420c', debug: 3});

var multiparty;

function start(){
    //Multiparty インスタンス
    multiparty = new MultiParty({
        "key":"3fe45e9c-4406-41e7-a3db-0b45be57420c",
        "reliable":true,
        "debug":3
    });

    // //for MediaStream
    // multiparty.on('my_ms',function(video){
    //     //自分のvideoを表示
    //     var vNode = MultiParty.util.createVideoNode(video);
    //     vNode.volume = 0;
    //     $(vNode).appendTo('#streams');
    // }).on('peer_ms', function(video){
    //     //peerのvideoを表示
    //     var vNode = MultiParty.util.createVideoNode(video);
    //     $(vNode).appendTo('#streams');
    // }).on('ms_close', function(peer_id){
    //     //peerが切れたら、対象のvideoノードを削除する
    //     $('#'+peer_id).remove();
    // })
    //for MediaStream
    multiparty.on('peer_ms', function(video){
        //peerのvideoを表示
        var vNode = MultiParty.util.createVideoNode(video);
        $(vNode).appendTo('#streams');
    }).on('ms_close', function(peer_id){
        //peerが切れたら、対象のvideoノードを削除する
        $('#'+peer_id).remove();
    })

    multiparty.start();

    $('#audio-mute').on('click',function(e){
        console.log('aaaa');
        var mute = !$(this).data('muted');
        multiparty.mute({audio: mute});
        $(this).text("audio " + (mute ? "unmute" : "mute")).data("muted", mute);
    });

}

start();
