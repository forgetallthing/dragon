/**
 * Created by zhang on 2017/7/25.
 */
const url = require("url");
const crypto = require('crypto');
const ipcRenderer = require('electron').ipcRenderer;
const remote = require('electron').remote;
const Menu = remote.Menu;
const appKey = '1e6a0b9073f830f9';
const secretKey = 'GnTQyr8G60Ek5ihgvUB7LdmYy8rc5U8L';
const api = 'http://openapi.youdao.com/api';

let menu = new Menu.buildFromTemplate([
    {
        label: '菜单',
        submenu: [
            {
                label: 'Dragon`s egg',
                type:"normal",
                click: function(){
                    // ipcRenderer.send('zqz-show') //注册的指令。send到主进程index.js中。
                    alert("Dragon eat you hands!", "you fool!", function () {
                    }, {type: 'warning', confirmButtonText: '是的'});
                }
            }
        ]
    },{
        label: '学术',
        submenu: [
            {
                label: '你最想要的美女图片',
                type:"normal",
                click: function(){
                    ipcRenderer.send('zqz-show') //注册的指令。send到主进程index.js中。
                }
            }
        ]
    }
]);

Menu.setApplicationMenu(menu);

$(function () {
    $('.shape0').on('click',function () {
        wocao();
    });
    $('.we').on('click',function () {
        alert("Dragon eat you hands!", "收藏功能暂未开放!充五块解锁新功能", function () {
        }, {type: 'error', confirmButtonText: '好吧，我不收藏了'});
    });
    $('#content').keyup(
        function(){
            let remain = $(this).val().length;
            if(remain > 5000){
                alert("Dragon eat you hands!", "字符超过限制!", function () {
                }, {type: 'error', confirmButtonText: '好吧，我删点'});
                $('#wordCurrent').text(remain);
            }else{
                $('#wordCurrent').text(remain);
            }
        }
    );
});

function wocao() {
    let word = $('#content').val();
    if(word&&word.length<=5000){
        $('#query').css("display","none");
        $('#query2').css("display","none");
        let hash = crypto.createHash('md5');
        let salt =parseInt(Math.random()*10);
        let sign = appKey+word+salt+secretKey;
        let from = $('#from option:selected').val();
        let to = $('#to option:selected').val();
        hash.update(sign);
        sign = hash.digest('hex');
        let curUrl =api+ '?q='+word+'&from='+from+'&to='+to+'&appKey='+appKey+'&salt='+salt+'&sign='+sign;
        $.ajax({
            type:"get",
            url:curUrl,
            async: true,
            data: {

            },
            success:function (data) {
                console.log(data);
                $('#content2').text(data.translation);
                if(data.basic){
                    $('#query').css("display","block").text(data.basic.phonetic);
                    if(data.basic.explains){
                        $('#query2').css("display","block").text(data.basic.explains.join(","));
                    }

                }
            }

        });
        ipcRenderer.send('word-message',word);
    }
}
//监听mian process里发出的message
ipcRenderer.on('as',function (event, arg) {
    alert(arg)
});