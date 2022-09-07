import React, {FormEvent, useEffect, useState} from 'react';
import {authProvider, dbProvider} from "../fbase";
import {useNavigate} from "react-router-dom";
import gweets from "./Gweets";
import {User} from "@firebase/auth"

interface ProfileProps {
    userObj: User;
    refreshUser: () => void;
}

const Profile = ({userObj, refreshUser}: ProfileProps) => {
    const [dispName, setDispName] = useState(userObj.displayName || "");
    const navigate = useNavigate();
    const onLogoutClick = async () => {
        await authProvider.signOut(authProvider.auth);
        navigate("/", {replace: true});
    }
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setDispName(e.currentTarget.value);
    };
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userObj.displayName !== dispName) {
            await authProvider.updateProfile(userObj, {
                displayName: dispName,
            });
            refreshUser();
        }
    }
    useEffect(() => {
        const query = dbProvider.query(dbProvider.collection(dbProvider.getFirestore(), "gweets"), dbProvider.where("creatorId", "==", userObj.uid));
        (async () => {
            const querySnapshot = await dbProvider.getDocs(query);
            querySnapshot.forEach(doc => {
                console.log(doc.data());
            });
        })();
    }, []);
    return (
        <div>
            Profile
            <form onSubmit={onSubmit}>
                <input type="text" placeholder={"Display name"} onChange={onChange} value={dispName}/>
                <input type="submit" value="update"/>
            </form>
            <button onClick={onLogoutClick}>Log out</button>
        </div>
    );
}

export default Profile;