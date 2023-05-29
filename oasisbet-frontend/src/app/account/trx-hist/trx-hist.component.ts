import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { TrxHistModel } from 'src/app/model/trx-hist.model';
import { ApiService } from 'src/app/services/api/api.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this.selectedTrxType);
    console.log(this.selectedPeriod);
    this.subscriptions.add(
      this.apiService.retrieveTrx(this.selectedTrxType, this.selectedPeriod).subscribe((resp: any) => {
        this.trxHistList = resp.trxHistList;
      })
    );

  }

}
