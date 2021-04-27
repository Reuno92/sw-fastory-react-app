import React, {FC, PropsWithChildren} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";
import Luke from '../../assets/img/Luke.webp';

type HeaderType = {
    user: string,
    dispatch: React.Dispatch<any>
}

const Header: FC<HeaderType> = (props: PropsWithChildren<HeaderType> ) => {

    let { user, dispatch } = props;

    let match = useRouteMatch({
        path: "/search"
    });

    const onLogout = () => {
        dispatch({type: 'AUTH_CLOSE'});
    };

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" variant={"dark"} className="d-flex">
                <Navbar.Brand>
                    <Link to="/">
                        <span className="font-weight-bolder">Star Wars</span> <span className="title-muted">Cyclopedia</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-menu"/>
                <Navbar.Collapse id="main-menu" className="justify-content-end">
                    <Nav className="mr-auto">
                        <Link to="/search">
                            <Nav.Link className={match ? "active" : ""}>Search</Nav.Link>
                        </Link>
                    </Nav>

                    <Nav className="user-menu">
                        <img className="avatar" src={Luke} alt={"Avatar of " + {user}} />
                        <span>{user}</span>
                        <button className="btn btn-sm btn-primary" onClick={ () => onLogout() }>Logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
