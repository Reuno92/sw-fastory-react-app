import { FC } from 'react';
import Login from "./components/Login";
import Search from "./components/Search";
import {Route} from "react-router-dom";

export interface AppRoute {
    name: string,
    path: string,
    component?: FC,
    roles?: Array<string>,
}

const Routes: Array<AppRoute> = [
    {
        'name' : 'login',
        'path' : '/login',
        component : Login,
    },
    {
        'name' : 'search',
        'path' : '/search',
        component : Search,
        roles: ['USER']
    }
]

export default Routes
