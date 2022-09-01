import React from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "Routes/Home";
import Profile from "../Routes/Profile";
import Auth from "../Routes/Auth";

interface RouterPorps {
    isLoggedIn: boolean;
}

const Router = ({isLoggedIn}: RouterPorps) => {
    console.log(isLoggedIn);
    return (
        <BrowserRouter>
            {isLoggedIn && (<ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/profile'}>Profile</Link></li>
            </ul>)}
            <Routes>
                {isLoggedIn ?
                    <>
                        <Route element={<Home/>} path={'/'}/>
                        <Route element={<Profile/>} path={'/profile'}/>
                    </>
                    : <Route element={<Auth/>} path={'/'}/>}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;