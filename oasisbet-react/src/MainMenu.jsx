import './MainMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import Button from 'react-bootstrap/Button';


export default function MainMenu(){
    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link main-menu-link" routerLink="/odds" routerLinkActive="active">Odds</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link main-menu-link" routerLink="/results" routerLinkActive="active">Results</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link main-menu-link" routerLink="/account" routerLinkActive="active">Account</a>
                    </li>
                    </ul>
                </div>

                <div class="right-navbar">
                    <ul class="navbar-nav">
                        <li class="nav-item user-menu-display">
                            <span>LOGGED IN &nbsp;</span>
                            <Button type="button" variant="secondary" class="btn-logout">Logout</Button>
                            <FontAwesomeIcon icon={faUser} class="user-icon"/>
                            <a class="login-username-tag" routerLink="/account" routerLinkActive="active"> CHOONANN</a>
                        </li>
                        <li class="nav-item">
                            <span class="balance-textbox">Balance: $99.88</span>
                        </li>
                    </ul>
                </div>
            </nav>

            
        </header>
    );
}