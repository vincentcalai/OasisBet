import { Component, OnInit, ViewChild } from '@angular/core';
import { OddsSideNavComponent } from '../odds-side-nav/odds-side-nav.component';
import { SharedVarService } from 'src/app/services/shared-var.service';
import { BetEvent } from 'src/app/model/bet-event.model';

@Component({
  selector: 'app-odds-landing',
  templateUrl: './odds-landing.component.html',
  styleUrls: ['./odds-landing.component.css']
})
export class OddsLandingComponent implements OnInit {

  competitionType: string;
  public events : BetEvent[];

  constructor(public sharedVar: SharedVarService) { 
    this.competitionType = this.sharedVar.COMP_HEADER_EPL;
  }

  ngOnInit(): void {
  }

  readCompType(compType: string){ 
    switch(compType) { 
      case 'soccer-epl': { 
         this.competitionType = this.sharedVar.COMP_HEADER_EPL;
         break; 
      } 
      case 'soccer-laliga': { 
        this.competitionType = this.sharedVar.COMP_HEADER_LALIGA; 
         break; 
      } 
      case 'soccer-bundesliga': { 
        this.competitionType = this.sharedVar.COMP_HEADER_BUNDESLIGA;
        break; 
      } 
      case 'soccer-serie-a': { 
        this.competitionType = this.sharedVar.COMP_HEADER_SERIE_A;
        break; 
      } 
      case 'soccer-ligue-one': { 
        this.competitionType = this.sharedVar.COMP_HEADER_LIGUE_ONE;
        break; 
      } 
      default: { 
        this.competitionType = '';
        break; 
      } 
    } 
  }

}
