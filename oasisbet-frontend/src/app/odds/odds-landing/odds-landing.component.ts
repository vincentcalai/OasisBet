import { Component, OnInit, ViewChild } from '@angular/core';
import { OddsSideNavComponent } from '../odds-side-nav/odds-side-nav.component';
import { SharedVarService } from 'src/app/services/shared-var.service';
import { BetEvent } from 'src/app/model/bet-event.model';
import { H2HEventOdds } from 'src/app/model/h2h-event-odds.model';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-odds-landing',
  templateUrl: './odds-landing.component.html',
  styleUrls: ['./odds-landing.component.css']
})
export class OddsLandingComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();

  competitionTypeHdr: string;
  public events : BetEvent[];
  public betEvent: BetEvent;
  public betEvent2: BetEvent;
  public betEvent3: BetEvent;

  constructor(public sharedVar: SharedVarService,
    public apiService: ApiService) {
    this.competitionTypeHdr = this.sharedVar.COMP_HEADER_EPL;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.apiService.retrieveOdds('soccer_epl').subscribe((resp: any) => {
        console.log(resp);
        this.events = resp.betEvent;
      } ,
        error => {
        console.log(error);
        this.sharedVar.changeException(error);
      }
    )
  );

  }

  readCompType(compType: string){
    switch(compType) {
      case 'soccer_epl': {
         this.competitionTypeHdr = this.sharedVar.COMP_HEADER_EPL;
         break;
      }
      case 'soccer_laliga': {
        this.competitionTypeHdr = this.sharedVar.COMP_HEADER_LALIGA;
         break;
      }
      case 'soccer_bundesliga': {
        this.competitionTypeHdr = this.sharedVar.COMP_HEADER_BUNDESLIGA;
        break;
      }
      case 'soccer_serie-a': {
        this.competitionTypeHdr = this.sharedVar.COMP_HEADER_SERIE_A;
        break;
      }
      case 'soccer_ligue-one': {
        this.competitionTypeHdr = this.sharedVar.COMP_HEADER_LIGUE_ONE;
        break;
      }
      default: {
        this.competitionTypeHdr = '';
        break;
      }
    }
  }

}
