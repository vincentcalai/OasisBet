import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account-landing',
  templateUrl: './account-landing.component.html',
  styleUrls: ['./account-landing.component.css']
})
export class AccountLandingComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  navToAccountMenu(accountMenu: string){
    console.log("navigating to.. " + accountMenu);
  }

}
