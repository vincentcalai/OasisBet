import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-landing',
  templateUrl: './account-landing.component.html',
  styleUrls: ['./account-landing.component.css']
})
export class AccountLandingComponent implements OnInit {

  selectAccountNavMenu = this.sharedVar.NAV_MENU_SELECT_ACCOUNT_OVERVIEW;

  constructor(public authService: AuthService, public sharedVar: SharedVarService) { }

  ngOnInit(): void {
  }

  navToAccountMenu(accountMenu: string){
    console.log("navigating to.. " + accountMenu);
    this.selectAccountNavMenu = accountMenu;
  }

}
