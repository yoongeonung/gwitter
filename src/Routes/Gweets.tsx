import React from 'react';

interface GweetsProps {
    gweet: Gweet;
    isOwner: boolean;
}

interface Gweet {
    id: string;
    createdAt: Date;
    creatorId: string;
    text: string;
}

const onDeleteClick = () => {

};

const onEditClick = () => {

};

const Gweets = ({gweet, isOwner}: GweetsProps) => {
    return (
        <div>
            {gweet.text}
            {isOwner && <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={onEditClick}>Edit</button>
            </>}
        </div>
    );
}

export default Gweets;