import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AUTHORIZATION, AUTH_USER, AuthService } from 'src/app/services/auth/auth.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})

export class AccountLoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  token: string = "";
  errorMsg: string = "";
  responseMsg: string = "";

  public subscriptions: Subscription = new Subscription();

  constructor(public sharedVar: SharedVarService, public apiService: ApiService, public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedVar.showUserNotLoginSource.subscribe(message => {
        this.errorMsg = message
      })
    );

    //get response success message after creating user
    this.subscriptions.add(
      this.sharedVar.responseSource.pipe(take(1))
      .subscribe(resp => {
        if(resp){
          this.responseMsg = resp.resultMessage;
          resp.resultMessage = "";
        }
      }
     )
    )
  }

  handleJWTAuthLogin(){
    this.responseMsg = "";
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
          console.log("token value: " + this.token);
          return this.apiService.retrieveAccDetails(this.username)
        }
      )
    )
    .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp.statusCode !== 0) {
            this.errorMsg = resp.resultMessage;
          } else {
            sessionStorage.setItem(AUTH_USER, this.username);
            sessionStorage.setItem(AUTHORIZATION, `Bearer ${this.token}`);
            sessionStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
            console.log("login successful");
          }
        },
        (error) => {
          console.log("login fail");
          this.errorMsg = this.sharedVar.INVALID_LOGIN_ERR_MSG;
        }
    )
  }

  signUpUser(){
    this.router.navigate(['create-user'], {skipLocationChange: true});
  }

  retrieveAccDetails(username: string, data: any){
     this.subscriptions.add(
        this.apiService.retrieveAccDetails(username).subscribe((resp: any) => {
          console.log(resp);
            if (resp.statusCode != 0) {
              this.errorMsg = resp.resultMessage;
            } else {
              sessionStorage.setItem(AUTH_USER, username);
              sessionStorage.setItem(AUTHORIZATION, `Bearer ${data.token}`);
              sessionStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
              console.log("login successful");
            }
          } ,
            error => {
            console.log(error);
            this.sharedVar.changeException(error);
          }
         )
    )
  }

  ngOnDestroy(){
    this.sharedVar.changeShowUserNotLoginMsg(null);
    this.subscriptions.unsubscribe();
  }

}
