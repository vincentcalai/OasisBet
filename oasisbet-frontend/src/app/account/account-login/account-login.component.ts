import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
