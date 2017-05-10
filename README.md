This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

> 看见[ShanaMaid]()写了一个react读书app， 自己借用API练习一下，记录练习过程。
## 创建仓库
 通过create-react-app创建初始环境， 安装antd UI库， 按照antd官网描述修改webpack配置按需加载。详细参照[antd](https://ant.design/docs/react/use-with-create-react-app-cn)

1、在src 文件下新建components文件夹在当前文件夹下面编写组件。
2、在src 下新建source文件存放字体图片等资源


3. 新建一个router文件配置路由跳转。路由用的是react-route-dom 也就是react-router 的升级版本，路由在我的理解就是通过url来匹配组件的显示这是下面是路由配置文件
```javascript
/* src/touter/router.config.js */
import Main from '../components/Main';
import Search from '../components/Search';
import About from '../components/About';
import BookIntro from '../components/BookIntro';
import Read from '../components/Read';
import ChangeOrigin from '../components/ChangeOrigin';
const routes = [
    {
        path: '/search',
        component: Search,
        exact: true,
    },
    {
        path: '/about',
        component: About,
        exact: true,
    },
    {
        path: '/bookIntro',
        component: BookIntro,
        exact: true,
    },
    {
        path: '/read/:id',
        component: Read
    },{
        path: '/changeOrigin',
        component: ChangeOrigin,
        exact: true,
    }
    ,{
        component: Main
    }
];

export  default routes;

/*src/router/Router.js*/
/**
 * Created by fydor on 2017/5/5.
 */
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import routes from './router.config';
const Routers = () => (
    <Router>
        <Switch>
            {
                routes.map((route,i)=> (
                   <Route key={i} path={route.path} exact={route.exact} component={route.component}/>
                ))
            }
        </Switch>
    </Router>
);

export default Routers;
```
这样配置可以直接在配置文件中添加路由，由于只有一层路由所以对象中没有继续嵌套routes（嵌套的意思是在当前显示的组件下面还有需要通过url匹配显示的组件）路由嵌套可以参照
<font color=deepPink>[react-router-dom route-config](https://reacttraining.com/react-router/web/example/route-config)</font>

目前位置目录结构如下
```
.
├── App.js
├── App.test.js
├── components
│   ├── About.js //用来显示关于页面
│   ├── BookIntro.js //介绍
│   ├── ChangeOrigin.js //换源
│   ├── Main.js //主页显示关注的图书
│   ├── Read.js //阅读界面
│   └── Search.js //搜索页
├── index.js ／／渲染页面
├── redux
│   ├── action.js  
│   └── reducer.js
├── router
│   ├── Routers.js
│   └── router.config.js
├── source
└── styles
```

## 在create-react-app 中通过` .eslintrc `配置文件配置 eslint
通过运行<font color=deepPink >`npm run eject`</font>使其暴露webpack等配置文件
##[自定义eslint 原文连接](https://segmentfault.com/a/1190000008853805)
> 上述步骤并没有暴露react脚手架封装的eslint操作，为了使得项目统一规范化，添加jsx-eslint操作是非常不错的选择（关于js其他的eslint操作，请参见官网，本文主要针对jsx限制规范配置）。

* 在项目根目录下添加.eslintrc文件
* 在根目录找到config文件夹，并找到文件夹下的webpack.config.dev.js文件
* webpack.config.dev.js文件修改添加如下代码
```
    preLoaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'eslint',
              enforce: 'pre',
              use: [{
                  // @remove-on-eject-begin
                  // Point ESLint to our predefined config.
                  options: {
                      //configFile: path.join(__dirname, '../.eslintrc'),
                      useEslintrc: true
                  },
                  // @remove-on-eject-end
                  loader: 'eslint-loader'
              }],
            include: paths.appSrc,
          }
        ],

```
.运行npm start,此时，你编写的jsx文件都是经过.eslintrc的配置限制
<font color=deepPink> `ps: 配置的value对应的值： 0 : off 1 : warning 2 : error`</font>
不满足以下的规范设置的，编译代码时将有黄色提示
<font color=deepPink> 
<pre>
    "extends": "react-app",
           "rules": {
             "no-multi-spaces": 1,
             "react/jsx-space-before-closing": 1,        // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
             "jsx-quotes": 1,
             "react/jsx-closing-bracket-location": 1,    // 遵循JSX语法缩进/格式
             "react/jsx-boolean-value": 1,               // 如果属性值为 true, 可以直接省略
             "react/no-string-refs": 1,      // 总是在Refs里使用回调函数
             "react/self-closing-comp": 1,    // 对于没有子元素的标签来说总是自己关闭标签
             "react/jsx-no-bind": 1,          // 当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去
             "react/sort-comp": 1,            // 按照具体规范的React.createClass 的生命周期函数书写代码
             "react/jsx-pascal-case": 1        // React模块名使用帕斯卡命名，实例使用骆驼式命名
           }
         }
</pre>
</font>


## 通过material UI 去对页面布局
* 书籍详情页
* 查询列表页

## 页面写好了以后肯定就是写功能了，功能我们不上一次性去写完而是用到什么添加什么
 目前书籍搜索页面布局好了以后开始添加功能,不知不觉自己的文件就变得多了。
 
 这里普及一下生成图形目录的工具 用的是tree 工具
 > 直接tree -I "node_modules|dist" 就出来了 😄 当然需要安装 这里链接一篇[mac上使用tree命令生成树状目录](http://qingtong234.github.io/2016/01/07/mac%E4%B8%8A%E4%BD%BF%E7%94%A8tree%E5%91%BD%E4%BB%A4%E7%94%9F%E6%88%90%E6%A0%91%E7%8A%B6%E7%9B%AE%E5%BD%95/)

 ```
    
├── README.md
├── config // 配置文件 create-react-app配置 缺少自己想要的功能就在上面添加
│   ├── env.js
│   ├── jest
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js 
│   └── webpack.config.prod.js
├── package.json
├── scripts  // node 启动文件
│   ├── build.js
│   ├── start.js // 启动文件 配置自己的转发可以在这里配置 如devserver的proxy
│   └── test.js
├── src
│   ├── App.js
│   ├── App.test.js
│   ├── components
│   │   ├── About.js
│   │   ├── BookIntro.js
│   │   ├── ChangeOrigin.js
│   │   ├── Main.js
│   │   ├── Read.js
│   │   ├── Search.js //只是一个简单的搜索页面返回按钮
│   │   └── commont
│   │       ├── Loading.js
│   │       ├── ReturnButton.js   //只是一个简单的返回按钮
│   │       └── Share.js  //只是一个简单的分享按钮
│   ├── index.js
│   ├── redux
│   │   ├── action.js
│   │   ├── middleware   // 这里是redux middleware 写的logmiddle 和 thunk ，当然也有人家写好了的自行github
│   │   │   └── middleware.js
│   │   ├── reducer.js
│   │   └── store.js 
│   ├── router
│   │   ├── Routers.js
│   │   └── router.config.js
│   ├── source
│   ├── styles
│   │   ├── animate.css
│   │   ├── bookIntro.css
│   │   ├── font     // 配置iconfont 这里使用的阿里 👌
│   │   │   └── font.css
│   │   ├── loading.css
│   │   ├── reset.css  
│   │   ├── search.css
│   │   ├── share.css
│   │   └── variables.css
│   └── tools
│       └── index.js
└── yarn.lock

```
##编写需要用到的action
> 这里目前用到的action有获取书籍列表receiveBookList 是否显示加载框 isShowLoading
自动不全 autoComplete 以上都是同步action 
```typescript jsx
import 'whatwg-fetch';
import { urlChange } from '../tools';

export const IS_LOADING = 'IS_LOADING';
export const GET_BOOK_LIST = 'GET_BOOK_LIST';
export const AUTO_COMPLETE = 'AUTO_COMPLETE';

const receiveBookList = (data, name) => ({
    type: GET_BOOK_LIST,
    searchData: data,
    name: name
});

export const isShowLoading = (isloading) => ({
    type: IS_LOADING,
    isloading
});

export const autoComplete = (name, completeList) => ({
    type: AUTO_COMPLETE,
    name,
    completeList
});



```
 ### 异步action 这里分发异步action需要用到 middleware 作用是dispatch的时候可以传除对象外还可以是函数
 下面是middleware src/redux/middleware/middleware.js
```typescript jsx
export const thunk = (store) => next => action =>
        typeof action === 'function' ?
            action(store.dispatch, store.getState) :
            next(action);

export const logger = (store) => next => action => {
      console.group(action.type);
      console.info('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd(action.type);
      return result;
}


>有了上面的middleware 就可以编写异步action了同样在 src/redux/action.js中添加
```typescript jsx
export const receiveAutoComplete = name => dispatch =>
    fetch(`book/auto-complete?query=${name}`)
        .then(res=>res.json())
        .then(data => dispatch(autoComplete(name,data.keywords)))
        .catch(error => new Error(error));



export const getBookList = (name) => dispatch => {
        dispatch(isShowLoading(true));
        return fetch(`/api/book/fuzzy-search?query=${name}&start=0`)
            .then(res => res.json())
            .then(data => data.books.map((book) => urlChange(book.cover)))
            .then(data => {
                let action = dispatch(receiveBookList(data,name));
                dispatch(isShowLoading(false));
                return action;
            })
            .catch(error => {
                new Error(error);
            })
        };

```

> action编写完毕 接下来就应该编写reducer ，reducer意思是铜鼓action计算出下次的state由于我们会用到<font color=deepPink>conbinereducer</font>所以
可以向下面的方式编写
src/redux/reducer.js
```typescript jsx
import { IS_LOADING, GET_BOOK_LIST, AUTO_COMPLETE } from './action';

export const bookList = (state = {books:[], name: ''},action={}) => {
    switch (action.type){
        case GET_BOOK_LIST:
            let { books, name } = action;
            return {name,books}
        default:
            return state;
    }
}

export const autoBookList = (state = {lists : [],name : '' }, action) => {
   switch (action.type){
       case AUTO_COMPLETE:
            let { completeList, name} = action;
            return {lists:completeList, name};
       default: return state;
   }

}

export const isLoading = (state = false,action) => {
    switch(action.type){
        case IS_LOADING:
            return action.isloading;
        default:
            return state;
    }
}


```

##生成store
底层步骤写完后下面就开始创建出我们需要的store了,创建store需要<font color=deepPink>redux 里面的方法</font>
```typescript jsx

//src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducer from './reducer';
import { thunk, logger} from './middleware/middleware';

let store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk,logger));

export default store;

```
##好了该有的方法我们都创建完毕在App文件中来测试一下❤先 ， 跟着我默念一遍咒语
> 神兽保佑🙏代码一次过

```typescript jsx
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import Routes from './router/Routers'
import darkBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/reset.css';
import { receiveAutoComplete, getBookList} from './redux/action';
import Loading from './components/commont/Loading';
import store from './redux/store';

store.subscribe(() =>
    console.log(store.getState())
)

store.dispatch(receiveAutoComplete('he'));

setTimeout(function () {
    store.dispatch(receiveAutoComplete('大'));
},1000)

setTimeout(function () {
    store.dispatch(getBookList('hello world'));
},2000)


/*引用tap事件适配移动端*/
injectTapEventPlugin();

class App extends Component {

  /*material-ui 需要配置主题才可以使用*/
  getChildContext() {
      return { muiTheme: getMuiTheme(darkBaseTheme) };
  }

  render() {
    return (
        <Provider store={store}>
          <div className="App">
                <Loading/>
                <Routes />
          </div>
        </Provider>
    );
  }
}

App.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default App;

```

## <font color=deepPink> 代码跑起来 npm start</font>
看到我们的控制台发现有个小警告说闭合标签前面需要有一个空格 果断跑去加一个 ![pic](githubImgs/测试redux逻辑.png);

在看一次我们的请求都发出去了，reducer也接收到action后为我们处理了。
![](githubImgs/测试redux.png);



