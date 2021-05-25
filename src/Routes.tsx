import {ComponentType, lazy, LazyExoticComponent, ReactNode} from 'react';

/**
 *
 * Sample: https://medium.com/@michael.kutateladze/react-router-with-a-single-config-file-61777f306b4f
 * Thank to Michael Kutateladze.
 */

export interface AppRoute {
    key: string
    path: string,
    component?: LazyExoticComponent<ComponentType<any>>,
    exact?: boolean,
    fallback: NonNullable<ReactNode>,
    routes?: AppRoute,
    redirect?: string,
    private?: boolean,
}

const appRoutesArray: Array<AppRoute> = [
    {
        key : 'search',
        path : '/search',
        component : lazy(() => import("./components/Search")),
        fallback: false,
        exact: true,
    },
    {
        key : 'singlePeople',
        path : '/people/:id',
        fallback: false,
        component : lazy(() => import("./components/Singles/People.single")),
    },
    {
        key : 'singleFilm',
        path : '/film/:id',
        fallback: false,
        component : lazy(() => import("./components/Singles/Films.single")),
    },
    {
        key : 'singlePlanet',
        path : '/planet/:id',
        fallback: false,
        component : lazy(() => import("./components/Singles/Planets.single")),
    },
    {
        key : 'singleSpecie',
        path : '/specie/:id',
        fallback: false,
        component : lazy(() => import("./components/Singles/Species.single")),
    },
    {
        key : 'singleStarship',
        path : '/starship/:id',
        fallback: false,
        component : lazy(() => import("./components/Singles/Starships.single")),
    },
    {
        key : 'singleVehicle',
        path : '/vehicles/:id',
        fallback: false,
        component : lazy(() => import("./components/Singles/Vehicles.single")),
    }
]

export default appRoutesArray
