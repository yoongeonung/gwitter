import React, {FormEvent, useEffect, useState} from 'react';
import {dbProvider} from "fbase";
import {addDoc, collection, onSnapshot, orderBy, query, where} from "firebase/firestore";


const Home = () => {
    const [gweet, setGweet] = useState('');
    const [gweetList, setGweetList] = useState<{ id: string; gweet: string; createdAt: Date }[]>();
    const onChange = (e: FormEvent<HTMLInputElement>) => {
        setGweet(e.currentTarget.value);
    }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addDoc(collection(dbProvider, "gweets"), {
            gweet,
            createdAt: Date.now(),
        });
        setGweet("");
    }

    useEffect(() => {
        const q = query(collection(dbProvider, 'gweets'), orderBy('createdAt','asc'));
        onSnapshot(q, snapshot => {
            const arr = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    createdAt: doc.get('createdAt'),
                    gweet: doc.get('gweet'),
                };
            });
            setGweetList(arr);
        })
    }, []);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input value={gweet} type={"text"} onChange={onChange}/>
            </form>
            <ul>
                {gweetList?.map(gw => {
                    return <li key={gw.id}>{gw.gweet}</li>
                })}
            </ul>
        </>

    )
}

export default Home;