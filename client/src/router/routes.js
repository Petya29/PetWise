import Login from "../views/auth/Login";
import Registration from "../views/auth/Registration";
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
    {
        id: 3,
        path: '/register',
        component: Registration,
        exact: true
    },
];