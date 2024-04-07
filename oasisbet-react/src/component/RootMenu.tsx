import React from "react";
import './RootMenu.css';
import Header from './Header.tsx';
import MainMenu from './MainMenu.tsx';
import { Outlet } from "react-router-dom";

export default function RootMenu(){
    return (
        <>
            <Header></Header>
            <MainMenu></MainMenu>
            <Outlet></Outlet>
        </>
    );
}