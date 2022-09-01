import React, {useEffect, useState} from 'react';
import {authProvider} from "fbase";
import Router from "Components/Router";
import {Link} from "react-router-dom";

function App() {
    const [init, setInit] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        authProvider.onAuthStateChanged(authProvider.auth, (user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        }));
    }, [])
    return (
        <>
            {init ? <Router isLoggedIn={isLoggedIn}/> : <>Initializing...</>}
            <footer>&copy; {new Date().getFullYear()} Gwitter</footer>
        </>
    );
}

export default App;
