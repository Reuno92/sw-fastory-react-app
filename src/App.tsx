import React, {Fragment, useReducer} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Header from "./components/Templates/Header"
import Login from "./components/Login";
import {initialStateLogin, loginReducer} from "./reducers/Login.reducer";
import appRoutesArray from './Routes';
import Router from "./hooks/Router.hooks";

function App() {

    const [{isAuth, user}, dispatch] = useReducer(loginReducer, initialStateLogin);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/search" />
                </Route>
                {
                    !isAuth && (
                        <Route path="/login">
                            <Login />
                        </Route>
                    )
                }
                {
                    isAuth && (
                        <Fragment>
                            <Header user={user} dispatch={dispatch}/>
                            <main>
                                <Router routes={appRoutesArray} />
                                {/*<Route exact path="/search">
                                    <Search />
                                </Route>
                                <Route path="/people/:id">
                                    <PeopleSingle />
                                </Route>
                                <Route path="/film/:id">
                                    <FilmsSingle />
                                </Route>
                                <Route path="/planet/:id">
                                    <PlanetsSingle />
                                </Route>
                                <Route path="/specie/:id">
                                    <SpeciesSingle />
                                </Route>
                                <Route path="/starship/:id">
                                    <StarshipsSingle />
                                </Route>
                                <Route path="/vehicle/:id">
                                    <VehiclesSingle />
                                </Route>*/}
                            </main>
                        </Fragment>
                    )
                }
            </Switch>
        </BrowserRouter>
    );
}

export default App;
