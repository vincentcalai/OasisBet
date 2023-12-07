import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedVarService } from '../shared-var.service';
import { Subscription } from 'rxjs';

export const AUTH_USER = 'authenticateUser';
export const AUTHORIZATION = 'authorization';
export const ACC_DETAILS = 'accountDetails';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private subscriptions: Subscription = new Subscription();

  constructor(
    public apiService: ApiService,
    public sharedVar: SharedVarService,
    public router: Router
  ) { }

    jwtAuthenticate() {
      return this.apiService.jwtAuthenticate();
    }

    isUserLoggedIn(){
      let user =  sessionStorage.getItem(AUTH_USER);
      let authorizationHeader = sessionStorage.getItem(AUTHORIZATION);
      let accDetails = sessionStorage.getItem(ACC_DETAILS)
      return user !== null && authorizationHeader !== null && accDetails !== null;
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

    clearSession(error: any){
      if (error instanceof HttpErrorResponse) {
        if (error.status !== 401) {
          this.sharedVar.changeException(error.message);
          return;
        }
        console.log("msg: ", error.error.message);
        if(error.error.message == "Access Token Expired"){
          console.log("Token Expired. Retrying refresh token");
          this.subscriptions.add(
              this.refreshJwtToken().subscribe((resp: any) => {
                if(resp.token){
                  sessionStorage.setItem(AUTHORIZATION, `Bearer ${resp.token}`);
                } else {
                  this.clearSessionStorage(error);
                }
              }, error => {
                this.clearSessionStorage(error);
              }
            )
          );
        } else {
          this.clearSessionStorage(error);
        }

      }
    }

    private clearSessionStorage(error: HttpErrorResponse) {
      console.log(error);
      sessionStorage.removeItem(AUTH_USER);
      sessionStorage.removeItem(AUTHORIZATION);
      sessionStorage.removeItem(ACC_DETAILS);
      this.router.navigate(['account']);
      this.sharedVar.changeException(this.sharedVar.UNAUTHORIZED_ERR_MSG);
    }

    refreshJwtToken() {
      return this.apiService.refreshJwtToken();
    }

    ngOnDestroy(){
      this.subscriptions.unsubscribe();
    }


}
