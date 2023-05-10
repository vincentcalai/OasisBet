import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
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
  public accountModel: AccountModel;

  selectAccountNavMenu = this.sharedVar.NAV_MENU_SELECT_ACCOUNT_OVERVIEW;

  constructor(public authService: AuthService, public sharedVar: SharedVarService, public apiService: ApiService) { }

  ngOnInit(): void {
    const user = this.authService.getAuthenticationUser();

    this.subscriptions.add(
      this.apiService.retrieveAccDetails(user).subscribe((resp: any) => {
        console.log(resp);
          this.accountModel = new AccountModel();
          this.accountModel.balance = resp.account.balance;
          this.accountModel.depositLimit = resp.account.depositLimit
          console.log("in subscription balance: " + this.accountModel.balance);
        } ,
          error => {
          console.log(error);
          this.sharedVar.changeException(error);
        }
      )
    )

    console.log("in ngOnInit balance: " + this.accountModel.balance);
  }

  navToAccountMenu(accountMenu: string){
    this.selectAccountNavMenu = accountMenu;
  }

}
