import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

export const AUTH_USER = 'authenticateUser';
export const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private apiService: ApiService, private router: Router) { }

    jwtAuthenticate(username: string, password: string) {
      return this.apiService.jwtAuthenticate(username, password);
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
        return sessionStorage.getItem(TOKEN);
      }
      return null;
    }

    logout(){
      if(confirm("Are you sure to logout?")) {
        console.log("logout ok");
        sessionStorage.removeItem(AUTH_USER);
        sessionStorage.removeItem(TOKEN);
        this.router.navigate(['/']);
      }
    }

}
