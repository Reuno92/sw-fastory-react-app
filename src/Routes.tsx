import React, {ComponentType, FC, lazy, LazyExoticComponent, ReactNode} from 'react';
import Login from "./components/Login";
import Search from "./components/Search";
import PeopleSingle from "./components/Singles/People.single";
import FilmsSingle from "./components/Singles/Films.single";
import PlanetsSingle from "./components/Singles/Planets.single";
import SpeciesSingle from "./components/Singles/Species.single";
import StarshipsSingle from "./components/Singles/Starships.single";
import VehiclesSingle from "./components/Singles/Vehicles.single";

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
