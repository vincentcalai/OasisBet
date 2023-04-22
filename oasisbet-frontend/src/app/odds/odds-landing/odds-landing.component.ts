import { Component, OnInit, ViewChild } from '@angular/core';
import { OddsSideNavComponent } from '../odds-side-nav/odds-side-nav.component';
import { SharedVarService } from 'src/app/services/shared-var.service';
import { BetEvent } from 'src/app/model/bet-event.model';
import { H2HEventOdds } from 'src/app/model/h2h-event-odds.model';

@Component({
  selector: 'app-odds-landing',
  templateUrl: './odds-landing.component.html',
  styleUrls: ['./odds-landing.component.css']
})
export class OddsLandingComponent implements OnInit {

  competitionType: string;
  public events : BetEvent[];
  public betEvent: BetEvent;
  public betEvent2: BetEvent;
  public betEvent3: BetEvent;

  constructor(public sharedVar: SharedVarService) { 
    this.competitionType = this.sharedVar.COMP_HEADER_EPL;
  }

  ngOnInit(): void {
    this.betEvent = new BetEvent;
    this.betEvent2 = new BetEvent;
    this.betEvent3 = new BetEvent;
    
    this.betEvent.competition = 'English Premier League';
    this.betEvent.eventDesc = 'Chelsea vs Manchester Utd';
    this.betEvent.startTime = new Date(2023, 6, 4, 20, 30, 0, 0);
    this.betEvent.eventId = 1002;

    this.betEvent2.competition = 'English Premier League';
    this.betEvent2.eventDesc = 'Arsenal vs Tottenham Hotspur';
    this.betEvent2.startTime = new Date(2023, 6, 4, 22, 0, 0, 0);
    this.betEvent2.eventId = 1003;

    this.betEvent3.competition = 'English Premier League';
    this.betEvent3.eventDesc = 'Everton vs Manchester City';
    this.betEvent3.startTime = new Date(2023, 6, 4, 22, 0, 0, 0);
    this.betEvent3.eventId = 1004;

    this.betEvent.h2hEventOdds = new H2HEventOdds;
    this.betEvent.h2hEventOdds.homeOdds = 2.2;
    this.betEvent.h2hEventOdds.drawOdds = 3.25;
    this.betEvent.h2hEventOdds.awayOdds = 2.75;

    this.betEvent2.h2hEventOdds = new H2HEventOdds;
    this.betEvent2.h2hEventOdds.homeOdds = 1.88;
    this.betEvent2.h2hEventOdds.drawOdds = 3.25;
    this.betEvent2.h2hEventOdds.awayOdds = 3.05;

    this.betEvent3.h2hEventOdds = new H2HEventOdds;
    this.betEvent3.h2hEventOdds.homeOdds = 4.15;
    this.betEvent3.h2hEventOdds.drawOdds = 3.30;
    this.betEvent3.h2hEventOdds.awayOdds = 1.65;

    this.events = [];
    this.events.push(this.betEvent);
    this.events.push(this.betEvent2);
    this.events.push(this.betEvent3);

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
