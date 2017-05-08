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








