import React from "react";
import './RootMenu.css';
import Header from './common/Header.tsx';
import MainMenu from './common/MainMenu.tsx';
import { Outlet } from "react-router-dom";
import WebSocketConfig from "./common/WebSocketConfig.tsx";

export default function RootMenu(){
    return (
        <>
            <Header></Header>
            <MainMenu></MainMenu>
            <Outlet></Outlet>
            <WebSocketConfig></WebSocketConfig>
        </>
    );
}