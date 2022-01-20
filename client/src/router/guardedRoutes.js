import Profile from "../views/user/Profile";

export const guardedRoutes = [
    {
        id: 1,
        path: '/profile',
        component: Profile,
        exact: true
    }
]