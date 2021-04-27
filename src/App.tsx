import React, {Fragment, useReducer} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Header from "./components/Templates/Header"
import Login from "./components/Login";
import Search from "./components/Search";
import {initialStateLogin, loginReducer} from "./reducers/Login.reducer";

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
                                <Route path='/search'>
                                    <Search/>
                                </Route>
                            </main>
                        </Fragment>
                    )
                }
            </Switch>
        </BrowserRouter>
    );
}

export default App;
