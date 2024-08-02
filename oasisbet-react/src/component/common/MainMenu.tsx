import './MainMenu.css';
import React from 'react';
import LoginMenu from './LoginMenu.tsx';
import NavMenu from './NavMenu.tsx';
import { PopupDialog } from './dialog/PopupDialog.tsx';

export default function MainMenu(){
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavMenu></NavMenu>
                <LoginMenu></LoginMenu>
                <PopupDialog></PopupDialog>
            </nav>
        </header>
    );
}