import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMsg: string = "";
  responseMsg: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleJWTAuthLogin(){
    this.authService.jwtAuthenticate(this.username,this.password)
    .subscribe(
      data => {
        console.log(data);
        console.log("login successful");
      },
      error => {
        console.log("login fail");
        this.errorMsg = "Please enter a valid credential. Login failed.";
      }
    )
  }

  signUpUser(){
    console.log("signUpUser");
  }

}
