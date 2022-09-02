import React, {FormEvent, useState} from 'react';
import {authProvider} from 'fbase';
import firebase from "firebase/compat";

const Auth = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState();
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const onEmailChange = (e: FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    };
    const onPasswordChange = (e: FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isNewUser) {
                await authProvider.createUserWithEmailAndPassword(authProvider.auth, email, password);
                await authProvider.setPersistence(authProvider.auth, authProvider.browserLocalPersistence);
            } else {
                await authProvider.signInWithEmailAndPassword(authProvider.auth, email, password);
                await authProvider.setPersistence(authProvider.auth, authProvider.browserLocalPersistence);
            }
        } catch (e: any) {
            setError(e.message);
        }
    }

    const onGoogleClick = async () => {
        const provider = new authProvider.GoogleAuthProvider();
        const result = await authProvider.signInWithPopup(authProvider.auth, provider);
        console.log(result.user);
    }

    const onToggle = () => setIsNewUser(prev => !prev);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder={'email'} value={email} onChange={onEmailChange}/>
                <input type="password" placeholder={'password'} onChange={onPasswordChange}/>
                <input type="submit" value={isNewUser ? 'sing up' : 'login'}/>
                {error ? <p>{error}</p> : ''}
            </form>
            <button onClick={onToggle}>{isNewUser ? 'Sign In' : 'Create New Account'}</button>
            <button onClick={onGoogleClick}>Continue with Google</button>
            <button>Continue with Github</button>
        </>
    );
}

export default Auth;