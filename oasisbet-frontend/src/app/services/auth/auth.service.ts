import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedVarService } from '../shared-var.service';
import { Subscription, interval } from 'rxjs';

export const AUTH_USER = 'authenticateUser';
export const AUTHORIZATION = 'authorization';
export const ACC_DETAILS = 'accountDetails';
export const LOGIN_TIME = 'loginTime';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private subscriptions: Subscription = new Subscription();

  private loginTime: number;

  constructor(
    public apiService: ApiService,
    public sharedVar: SharedVarService,
    public router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

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

    startLoginTimer() {
      this.loginTime = +sessionStorage.getItem(LOGIN_TIME) || 0;
      this.sharedVar.loginTimerSource = interval(1000).subscribe(() => {
        this.sharedVar.loginTimer = this.getLoggedInDuration();
      });
    }

    getLoggedInDuration(): string {
      if (this.isUserLoggedIn()) {
        const durationInSeconds = Math.floor((Date.now() - this.loginTime) / 1000);
        return this.formatDuration(durationInSeconds);
      }
      return '00:00:00';
    }

    private formatDuration(seconds: number): string {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formattedHours = this.padNumber(hours);
      const formattedMinutes = this.padNumber(minutes);
      const formattedSeconds = this.padNumber(remainingSeconds);

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    private padNumber(num: number): string {
      return num < 10 ? `0${num}` : `${num}`;
    }


    logout(){
      if(confirm("Are you sure to logout?")) {
        console.log("logout ok");
        this.sharedVar.loginTimer = '00:00:00';
        this.sharedVar.loginTimerSource.unsubscribe();
        this.clearSessionStorage();
      }
    }

    handleError(error: any){
      if (error instanceof HttpErrorResponse) {
        if (error.status !== 401) {
          this.sharedVar.changeException(error.message);
          return;
        }
        console.log("Error Message: ", error.error);
        if(error.error && error.error.message == "Access Token Expired"){
          console.log("Token Expired. Retrying refresh token");
          this.subscriptions.add(
              this.refreshJwtToken().subscribe((resp: any) => {
                if(resp.token){
                  sessionStorage.setItem(AUTHORIZATION, `Bearer ${resp.token}`);
                  //navigate to Account Landing page when there is a successful token refresh
                  this.router.navigate(['account']);
                } else {
                  console.log(error);
                  this.clearSessionStorage();
                  this.sharedVar.changeException(this.sharedVar.UNAUTHORIZED_ERR_MSG);
                }
              }, error => {
                console.log(error);
                this.clearSessionStorage();
                this.sharedVar.changeException(this.sharedVar.UNAUTHORIZED_ERR_MSG);
              }
            )
          );
        } else {
          console.log(error);
          this.clearSessionStorage();
          this.sharedVar.changeException(this.sharedVar.UNAUTHORIZED_ERR_MSG);
        }
      }
    }

    public clearSessionStorage() {
      sessionStorage.removeItem(AUTH_USER);
      sessionStorage.removeItem(AUTHORIZATION);
      sessionStorage.removeItem(ACC_DETAILS);
      sessionStorage.removeItem(LOGIN_TIME);
      this.router.navigate(['account']);
    }

    refreshJwtToken() {
      return this.apiService.refreshJwtToken();
    }

    ngOnDestroy(){
      this.subscriptions.unsubscribe();
    }


}
