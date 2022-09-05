import React, {useEffect, useState} from 'react';
import {authProvider} from "fbase";
import Router from "Components/Router";

function App() {
    const [init, setInit] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState<any>();
    useEffect(() => {
        authProvider.onAuthStateChanged(authProvider.auth, (user => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
                console.log(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(false);
        }));
    }, [])
    return (
        <>
            {init ? <>Initializing...</> : <Router isLoggedIn={isLoggedIn} userObj={userObj}/>}
            <footer>&copy; {new Date().getFullYear()} Gwitter</footer>
        </>
    );
}

export default App;
