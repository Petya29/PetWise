import React from 'react';
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from '../../router/routes';
import { guardedRoutes } from '../../router/guardedRoutes';
import GuardedRoute from './GuardedRoute';

export default function AppRouter() {

    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <Switch>
            {routes.map((route) => (
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.id}
                />
            ))}
            {guardedRoutes.map(route =>
                <GuardedRoute
                    component={route.component}
                    auth={isAuth}
                    path={route.path}
                    exact={route.exact}
                    key={route.id}
                />
            )}
            <Redirect to="/weather" />
        </Switch>
    )
}
