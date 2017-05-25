var express = require('express');
var app = express();
var path = require('path');
var httpProxyMiddleware = require('http-proxy-middleware');
var openBrowser = require('react-dev-utils/openBrowser');
var DIR = process.cwd();

//提供静态文件服务，这样就能找到你的文件
app.use(express.static(path.resolve(DIR,'build')));
var optionProxy = {
        proxy: {
            '/api': {
                target: 'http://api.zhuishushenqi.com/',
                pathRewrite: {'^/api' : '/'},
                changeOrigin: true
            },
            '/chapter': {
                target: 'http://chapter2.zhuishushenqi.com/',
                pathRewrite: {'^/chapter' : '/chapter'},
                changeOrigin: true
            },
            '/book/': {
                target: 'http://api.zhuishushenqi.com/',
                pathRewrite: {'^/book': '/book'},
                changeOrigin: true
            }
        }
}

for(var key in optionProxy.proxy){
    var option = {};
    for(var optionkey in optionProxy.proxy[key]){
        option[optionkey] = optionProxy.proxy[key][optionkey];
    }
    app.use(key,httpProxyMiddleware(option));
}

app.use('/*',httpProxyMiddleware(option))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});


app.get('/', (req, res) => {
    res.sendFile(path.resolve(DIR,'index.html'));
})


app.listen(3001,function () {
    console.log('listen 3001');
    openBrowser('http://localhost'  + ':' + 3001 + '/');
});
















