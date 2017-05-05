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











