import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {

  public errorMsg: string;
  public ytdDepositAmt: number;
  public ytdWithdrawalAmt: number;

  accountModelInput: AccountModel;

  public subscriptions: Subscription = new Subscription();

  constructor(public sharedVar: SharedVarService, public authService: AuthService, public apiService: ApiService) { }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();

    if (!this.accountModelInput) {
      this.sharedVar.changeException('Account details are null.');
      throw new Error('Account details are null.');
    }

    let accId = this.accountModelInput.accId;

    this.subscriptions.add(
      this.apiService.retrieveYtdAmounts(accId).subscribe((resp: any) => {
            this.ytdDepositAmt = resp.account.ytdDepositAmt;
            this.ytdWithdrawalAmt = resp.account.ytdWithdrawalAmt;
        } ,
          error => {
            console.log(error);
            this.authService.handleError(error);
        }
       )
    )
  }

}
