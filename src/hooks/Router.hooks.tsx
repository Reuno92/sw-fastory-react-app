import React from 'react';
import { Switch } from 'react-router-dom';
import {AppRoute} from "../Routes";
import RoutesWithSubRoutes from "./RoutesWithSubRoutes";

type RouterHooksType = {
    routes: Array<AppRoute>
}

const Router: React.FC<RouterHooksType> = ({ routes }) => {
    return <Switch>
            {
                routes.map(
                    (route: AppRoute) =>
                        <RoutesWithSubRoutes
                            {...route}
                        />
                )
            }
        </Switch>
}

export default Router;
