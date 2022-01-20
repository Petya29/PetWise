import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from '../../router/routes';

export default function AppRouter() {
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
            <Redirect to="/weather" />
        </Switch>
    )
}
