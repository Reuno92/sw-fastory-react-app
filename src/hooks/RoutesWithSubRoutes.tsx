import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {AppRoute} from "../Routes";

const RoutesWithSubRoutes = (route: AppRoute) => {
    /* Authenticated flag */
    const authenticated: boolean = true;

    return (
        <Suspense fallback={route.fallback}>
            <Route
                path={route.path}
                render={
                    (props) =>
                        route.redirect ? <Redirect to={route?.redirect} /> :
                            route.private ? (
                                authenticated ? route?.component &&
                                    <route.component { ...props } routes={route?.routes} /> : <Redirect to={'/search'} />
                            ) : route.component && <route.component { ...props } routes={route?.routes}/>
                }
            />
        </Suspense>
    );
}

export default RoutesWithSubRoutes;
