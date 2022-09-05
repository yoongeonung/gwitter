import React, {FormEvent, useState} from 'react';
import {collection, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {dbProvider} from "../fbase";

interface GweetsProps {
    gweet: Gweet;
    isOwner: boolean;
}

interface Gweet {
    id: string;
    createdAt: Date;
    creatorId: string;
    text: string;
    downloadUrl: string;
}

const Gweets = ({gweet, isOwner}: GweetsProps) => {
    const [edit, setEdit] = useState(false);
    const [newGweet, setNewGweet] = useState('');
    const toggleEdit = () => {
        setEdit(prev => !prev);
        setNewGweet(gweet.text);
    };
    const onDeleteClick = async () => {
        await deleteDoc(doc(collection(dbProvider, 'gweets'), gweet.id));
    };
    const onChnage = (e: FormEvent<HTMLInputElement>) => {
        setNewGweet(e.currentTarget.value);
    }
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateDoc(doc(collection(dbProvider, "gweets"), gweet.id), "text", newGweet);
        toggleEdit();
    }
    return (
        edit ? (
            <>
                <form onSubmit={onSubmit}>
                    <input type={"text"} value={newGweet} onChange={onChnage}/>
                </form>
            </>
        ) : (
            <div>
                {gweet.downloadUrl && (
                    <img src={gweet.downloadUrl} width={50} height={50}/>
                )}
                {gweet.text}
                {isOwner && <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={toggleEdit}>Edit</button>
                </>}
            </div>
        )


    );
}

export default Gweets;