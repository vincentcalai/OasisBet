import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { TrxHistModel } from 'src/app/model/trx-hist.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-trx-hist',
  templateUrl: './trx-hist.component.html',
  styleUrls: ['./trx-hist.component.css']
})
export class TrxHistComponent implements OnInit {

  public mtdBetAmount: string;
  public mtdPayout: string;

  public subscriptions: Subscription = new Subscription();
  public selectedTrxType: string = 'funds';
  public selectedPeriod: string = 'today';
  public trxHistList: TrxHistModel[] = [];
  accountModelInput: AccountModel;

  constructor(public apiService: ApiService, public sharedVar: SharedVarService, public authService: AuthService) { }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
    let accId = this.accountModelInput.accId;

    this.subscriptions.add(
        this.apiService.retrieveMtdAmounts(accId).subscribe((resp: any) => {
              this.mtdBetAmount = resp.account.mtdBetAmount;
              this.mtdPayout = resp.account.mtdPayout;
          } ,
            error => {
            console.log(error);
            this.sharedVar.changeException(error);
          }
        )
    );

    this.subscriptions.add(
      this.apiService.retrieveTrx(accId, this.selectedTrxType, this.selectedPeriod).subscribe((resp: any) => {
        this.trxHistList = resp.trxHistList;
        console.log(this.trxHistList);
      })
    );
  }

  toggleShowDetails(trx: TrxHistModel){
    trx.showDetails = !trx.showDetails;
  }

}
