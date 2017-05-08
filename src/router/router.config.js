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

export default routes;