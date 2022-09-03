import React, {FormEvent, useEffect, useState} from 'react';
import {dbProvider} from "fbase";
import {addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import firebase from "firebase/compat";
import Gweets from "./Gweets";


interface HomeProps {
    userObj: firebase.User;
}

interface Gweet {
    id: string;
    createdAt: Date;
    creatorId: string;
    text: string;
}


const Home = ({userObj}: HomeProps) => {
    const [gweet, setGweet] = useState('');
    const [gweetList, setGweetList] = useState<Gweet[]>();
    const [attachment, setAttachment] = useState('');
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setGweet(e.currentTarget.value);
    }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addDoc(collection(dbProvider, "gweets"), {
            text: gweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setGweet("");
    }

    useEffect(() => {
        const q = query(collection(dbProvider, 'gweets'), orderBy('createdAt', 'asc'));
        onSnapshot(q, snapshot => {
            const arr: Gweet[] = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    createdAt: doc.get('createdAt'),
                    creatorId: doc.get('creatorId'),
                    text: doc.get('text'),
                };
            });
            console.log(arr);
            setGweetList(arr);
        })
    }, []);
    const onAttachedFiles = (e: FormEvent<HTMLInputElement>) => {
        const {currentTarget: {files}} = e;
        if (!files || files.length < 0) {
            return;
        }
        const file = files.item(0);
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            if (!e.target) {
                return;
            }
            const {target: {result}} = e;
            if (!result) {
                return;
            }
            setAttachment(result.toString());
        }
        if (!file) {
            return;
        }
        fileReader.readAsDataURL(file);


    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input value={gweet} type={"text"} onChange={onChange}/>
                <input type="file" accept={'image/jpeg, ,image/png'} onChange={onAttachedFiles}/>
                <button>Gweet!</button>
            </form>
            {attachment && <img src={attachment} alt="attachmented-image"/> }
            {gweetList?.map(gw => {
                return <Gweets gweet={gw} isOwner={gw.creatorId === userObj.uid}/>
            })}

        </>

    );
}

export default Home;