import React from 'react';
import { Switch } from 'react-router-dom';
import {AppRoute} from "../Routes";
import RoutesWithSubRoutesHooks from "./RoutesWithSubRoutes.hooks";

type RouterHooksType = {
    routes: Array<AppRoute>
}

const Router: React.FC<RouterHooksType> = ({ routes }) => {
    return <Switch>
            {
                routes.map(
                    (route: AppRoute) =>
                        <RoutesWithSubRoutesHooks
                            {...route}
                        />
                )
            }
        </Switch>
}

export default Router;
