import Login from "../views/auth/Login";
import Home from "../views/Home";

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
];