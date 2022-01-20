import Login from "../views/auth/Login";
import Home from "../views/Home";
import Profile from "../views/user/Profile";

export const routes = [
    {
        id: 1,
        path: '/',
        component: Home,
        exact: true
    },
    {
        id: 2,
        path: '/login',
        component: Login,
        exact: true
    },
    {
        id: 3,
        path: '/profile',
        component: Profile,
        exact: true
    }
];