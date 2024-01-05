import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { take, finalize, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AUTHORIZATION, AUTH_USER, AuthService, LOGIN_TIME } from 'src/app/services/auth/auth.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public spinme: string = 'none';
  username: string = "";
  password: string = "";
  token: string = "";

  public subscriptions: Subscription = new Subscription();

  constructor(public authService: AuthService,
    public router: Router,
    public apiService: ApiService,
    public sharedVar: SharedVarService,
    public sharedMethods: SharedMethodsService) { }

  ngOnInit(): void {
    if(localStorage.getItem(LOGIN_TIME)){
      this.authService.startLoginTimer();
    }

    this.subscriptions.add(
      this.sharedVar.currentSpinner.subscribe(status => this.spinme = status)
    );
  }

  handleJWTAuthLogin(){
    this.sharedVar.changeSpinner('block');
    this.sharedVar.loginCredentialsModel.username = this.username;
    this.sharedVar.loginCredentialsModel.password = this.password;
    this.authService.jwtAuthenticate()
    .pipe(
      take(1),
      finalize(() => this.sharedVar.changeSpinner('none')),
      switchMap(
        (data: any) => {
          this.token = data.token;
          localStorage.setItem(AUTH_USER, this.username);
          localStorage.setItem(AUTHORIZATION, `Bearer ${this.token}`);
          localStorage.setItem(LOGIN_TIME, Date.now().toString());
          this.authService.startLoginTimer();
          return this.apiService.retrieveAccDetails(this.username)
        }
      ),
      catchError((error) => {
        console.error('Authentication error:', error);
        this.sharedVar.changeException(error.message);
        return throwError('Authentication failed');
      })
    )
    .subscribe(
        (resp: any) => {
          console.log(resp);
          this.username = "";
          this.password = "";
          if (resp.statusCode !== 0) {
            this.sharedVar.commonErrorMsg = resp.resultMessage;
          } else {
            localStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
            console.log("login successful");
          }
        },
        (error) => {
          console.log("login fail", error);
          this.sharedVar.commonErrorMsg = this.sharedVar.INVALID_LOGIN_ERR_MSG;
          this.username = "";
          this.password = "";
          this.router.navigate(['account']);
        }
    )
  }

  signUpUser(){
    this.router.navigate(['create-user'], {skipLocationChange: true});
  }

  logout(): void {
    this.authService.logout();
  }
}
