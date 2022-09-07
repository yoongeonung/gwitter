import React, {FormEvent, useEffect, useState} from 'react';
import {dbProvider, storageProvider} from "fbase";
import {addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import Gweets from "./Gweets";
import {v4 as uuid} from "uuid";
import {User} from 'firebase/auth';


interface HomeProps {
    userObj: User;
}

interface Gweet {
    id: string;
    createdAt: Date;
    creatorId: string;
    text: string;
    downloadUrl: string;
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

        let downloadURL = "";
        if (attachment) {
            const uploadResult = await storageProvider.uploadString(storageProvider.ref(storageProvider.getStorage(), `${userObj.uid}/${uuid()}`), attachment, "data_url");
            downloadURL = await storageProvider.getDownloadURL(uploadResult.ref);
        }
        await addDoc(collection(dbProvider.getFirestore(), "gweets"), {
            text: gweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            downloadURL,
        });
        setGweet("");
        setAttachment("");

        console.log("gweety", gweet);
        console.log(attachment);
    }

    useEffect(() => {
        const q = query(collection(dbProvider.getFirestore(), 'gweets'), orderBy('createdAt', 'asc'));
        onSnapshot(q, snapshot => {
            const arr: Gweet[] = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    createdAt: doc.get('createdAt'),
                    creatorId: doc.get('creatorId'),
                    text: doc.get('text'),
                    downloadUrl: doc.get('downloadURL'),
                };
            });
            setGweetList(arr);
        })
    }, []);
    const onAttachedFiles = (e: FormEvent<HTMLInputElement>) => {
        let {currentTarget} = e;
        if (!currentTarget) {
            return;
        }
        if (!currentTarget.files || currentTarget.files.length < 0) return;
        const file = currentTarget.files.item(0);

        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            if (!e.target) {
                return;
            }
            let {target: {result}} = e;
            if (!result) {
                return;
            }
            setAttachment(result.toString());
        }
        if (!file) {
            return;
        }
        fileReader.readAsDataURL(file);
        e.currentTarget.value = "";
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input value={gweet} type={"text"} onChange={onChange}/>
                <input type="file" accept={'image/jpeg, ,image/png'} onChange={onAttachedFiles}/>
                <button type={'submit'}>Gweet!</button>
            </form>
            {attachment && <img src={attachment} alt="attachmented"/>}
            {gweetList?.map(gw => {
                return <Gweets key={gw.id} gweet={gw} isOwner={gw.creatorId === userObj.uid}/>
            })}
        </>

    );
}

export default Home;