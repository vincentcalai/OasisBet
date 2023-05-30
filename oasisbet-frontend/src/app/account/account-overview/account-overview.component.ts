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

  constructor(private sharedVar: SharedVarService, private authService: AuthService, private apiService: ApiService) { }

  ngOnInit(): void {
    let username = this.authService.getAuthenticationUser();

    this.subscriptions.add(
      this.apiService.retrieveAccDetails(username).subscribe((resp: any) => {
          if (resp.statusCode != 0) {
            this.errorMsg = resp.resultMessage;
          } else {
            this.accountModelInput = resp.account;
            this.ytdDepositAmt = resp.account.ytdDepositAmt;
            this.ytdWithdrawalAmt = resp.account.ytdWithdrawalAmt;
          }
        } ,
          error => {
          console.log(error);
          this.sharedVar.changeException(error);
        }
       )
    )

    //this.accountModelInput = this.authService.getRetrievedAccDetails();
    //console.log(this.accountModelInput);
  }

}
