import React, { useEffect } from "react";
import './ResultLanding.css';
import { useDispatch } from "react-redux";

export default function ResultLanding(){

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("RESULT COMPONENT rendered!");
        dispatch({type: 'EMPTY_BET_SELECTION'});
    })

    return (
        <p>Result works!</p>
    );
}