/**
 * Created by zhang on 2017/7/24.
 */
const app = require('electron').app;  // 控制应用生命周期的模块。
const BrowserWindow = require('electron').BrowserWindow;  // 创建原生浏览器窗口的模块
const ipcMain = require('electron').ipcMain;


// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
let mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        autoHideMenuBar:false,
        icon:"img/logo.png",
        minWidth:980,
        minHeight:300,
        transparent:false,
        backgroundColor:"#FFFFFF"
    });

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // 打开开发工具
    // mainWindow.openDevTools();

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });

    let presWindow = new BrowserWindow({
        width: 300,
        height: 400,
        show: false
    });

    presWindow.loadURL('file://' + __dirname + '/presWindow.html'); //新窗口

    ipcMain.on('zqz-show',function(e) {
        presWindow.show();
        // e.sender.send('as',"you fool");
    });

    ipcMain.on('word-message',function(event, arg) {
        if(arg){

        }

        console.log(arg)
    });
});
