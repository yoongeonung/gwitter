import React from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "Routes/Home";
import Profile from "../Routes/Profile";
import Auth from "../Routes/Auth";
import { User } from 'firebase/auth';

interface RouterPorps {
    isLoggedIn: boolean;
    refreshUser: () => void;
    userObj: User | undefined;
}

const Router = ({isLoggedIn, userObj, refreshUser}: RouterPorps) => {
    console.log(isLoggedIn);
    return (
        <BrowserRouter>
            {isLoggedIn && userObj && (<ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/profile'}>{userObj.displayName}'s Profile</Link></li>
            </ul>)}
            <Routes>
                {isLoggedIn && userObj ?
                    <>
                        <Route element={<Home userObj={userObj}/>} path={'/'}/>
                        <Route element={<Profile userObj={userObj} refreshUser={refreshUser}/>} path={'/profile'}/>
                    </>
                    : <Route element={<Auth/>} path={'/'}/>}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;