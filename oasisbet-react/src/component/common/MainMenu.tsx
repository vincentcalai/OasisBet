import './MainMenu.css';
import React from 'react';
import LoginMenu from './LoginMenu.tsx';
import NavMenu from './NavMenu.tsx';

export default function MainMenu(){
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavMenu></NavMenu>
                <LoginMenu></LoginMenu>
            </nav>
        </header>
    );
}