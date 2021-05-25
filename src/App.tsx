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
                            </main>
                        </Fragment>
                    )
                }
            </Switch>
        </BrowserRouter>
    );
}

export default App;
