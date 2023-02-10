import {useParams} from "react-router-dom";
import React from "react";

const WelcomeComponent = () => {
    const {username} = useParams()
    return (
        <div>
            <h1>Welcome {username}</h1>
            Welcome Component
        </div>
    );
};



export default WelcomeComponent;