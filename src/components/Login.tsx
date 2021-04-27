import {ChangeEvent, FC, FormEvent, useReducer, useState} from "react";
import logo from '../logo.svg';
import backdrop from '../assets/img/sw_backdrop.jpg';
import video180 from '../assets/video/SW_180p.mp4';
import video360 from '../assets/video/SW_360p.mp4';
import video720 from '../assets/video/SW_720p.mp4';
import video1080 from '../assets/video/SW_1080p.mp4';
import {initialStateLogin, loginReducer} from "../reducers/Login.reducer";
import env from "react-dotenv";

const Login: FC = () => {

    const [state, dispatch] = useReducer(loginReducer, initialStateLogin);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    console.log(env);

    const userOptions = {
        user: "Luke",
        password: "DadSucks"
    }

    const handlerSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (userOptions.user === user && userOptions.password === password ) {
            dispatch({ type: 'AUTH_ALLOWED', user: process.env.USER});
        }
    }

    return (
        <section id="login">
            <video className="" controls={false} autoPlay={true} poster={backdrop} preload="metadata" loop>
                <source src={video180} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                        media="screen and (max-device-width: 320px)"/>
                <source src={video360} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                        media="screen and (max-device-width: 640px)"/>
                <source src={video720} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                        media="screen and (max-device-width: 1280px)"/>
                <source src={video1080} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                        media="screen and (min-device-width: 1920px)"/>
            </video>
            <section className="container">
                <div className="sw-login">
                    <div className="row">
                        <form className="col-12 offset-lg-8 col-lg-4" onSubmit={(e: FormEvent<HTMLFormElement>) => handlerSubmit(e) }>
                            <img src={logo} alt="star wars cylopedia" className="img-fluid"/>

                            <label className="form-label text-white" htmlFor="login">Login</label>
                            <div className="input-group">
                                <input type="text" id="login" value={user} onChange={ (e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)} className="form-control"/>
                            </div>

                            <label className="form-label text-white mt-3" htmlFor="password">Password</label>
                            <div className="input-group">
                                <input type="text" id="login" value={password} onChange={ (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className="form-control"/>
                            </div>

                            <input type="submit" className="btn btn-lg btn-primary w-100 mt-3"/>
                        </form>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Login;
