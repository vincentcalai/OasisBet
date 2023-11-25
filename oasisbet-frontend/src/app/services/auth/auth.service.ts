import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

export const AUTH_USER = 'authenticateUser';
export const AUTHORIZATION = 'authorization';
export const ACC_DETAILS = 'accountDetails';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public apiService: ApiService, public router: Router) { }

    jwtAuthenticate() {
      return this.apiService.jwtAuthenticate();
    }

    isUserLoggedIn(){
      let user =  sessionStorage.getItem(AUTH_USER);
      return !(user === null);
    }

    getAuthenticationUser(){
      return sessionStorage.getItem(AUTH_USER);
    }

    getAuthenticationToken(){
      if(this.getAuthenticationUser()){
        return sessionStorage.getItem(AUTHORIZATION);
      }
      return null;
    }

    getRetrievedAccDetails(){
      return JSON.parse(sessionStorage.getItem(ACC_DETAILS));
    }

    logout(){
      if(confirm("Are you sure to logout?")) {
        console.log("logout ok");
        sessionStorage.removeItem(AUTH_USER);
        sessionStorage.removeItem(AUTHORIZATION);
        sessionStorage.removeItem(ACC_DETAILS);
        this.router.navigate(['/']);
      }
    }

}
