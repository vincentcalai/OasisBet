import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { TrxHistModel } from 'src/app/model/trx-hist.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-trx-hist',
  templateUrl: './trx-hist.component.html',
  styleUrls: ['./trx-hist.component.css']
})
export class TrxHistComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();
  public selectedTrxType: string = 'funds';
  public selectedPeriod: string = 'today';
  public trxHistList: TrxHistModel[];
  accountModelInput: AccountModel;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
    let accId = this.accountModelInput.accId;

    this.subscriptions.add(
      this.apiService.retrieveTrx(accId, this.selectedTrxType, this.selectedPeriod).subscribe((resp: any) => {
        this.trxHistList = resp.trxHistList;
      })
    );

  }

}
