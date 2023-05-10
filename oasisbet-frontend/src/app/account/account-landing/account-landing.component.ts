import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-landing',
  templateUrl: './account-landing.component.html',
  styleUrls: ['./account-landing.component.css']
})
export class AccountLandingComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();
  
  public balanceValue: number;
  selectAccountNavMenu = this.sharedVar.NAV_MENU_SELECT_ACCOUNT_OVERVIEW;

  constructor(public authService: AuthService, public sharedVar: SharedVarService, public apiService: ApiService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.apiService.retrieveAccDetails().subscribe((resp: any) => {
          this.balanceValue = resp.balanace;
        } ,
          error => {
          console.log(error);
          this.sharedVar.changeException(error);
        }
      )
    )
  }

  navToAccountMenu(accountMenu: string){
    this.selectAccountNavMenu = accountMenu;
  }

}
