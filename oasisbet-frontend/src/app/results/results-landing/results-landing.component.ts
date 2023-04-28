import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetEvent } from 'src/app/model/bet-event.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-results-landing',
  templateUrl: './results-landing.component.html',
  styleUrls: ['./results-landing.component.css']
})
export class ResultsLandingComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();

  compType: string = 'soccer_epl';
  competitionTypeHdr: string;
  public events : BetEvent[];
  public eventDates: string[];
  public eventsMap: Map<string, BetEvent[]> = new Map();

  constructor(public sharedVar: SharedVarService,
    public apiService: ApiService) {
    this.competitionTypeHdr = this.sharedVar.COMP_HEADER_EPL;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.apiService.retrieveOdds(this.compType).subscribe((resp: any) => {
        this.events = resp.betEvent;

        //convert json response from String to Date format
        this.events.map(event => event.startTime = new Date(event.startTime));

        //save unique event dates from all events retrieved
        this.eventDates = Array.from(new Set(this.events.map(event => {
          return event.startTime.toDateString();
        })));

        //save into a event map with unique event dates after retrival of events -> (Date string, BetEvents[])
        this.eventDates.forEach(dateString => {
          const eventsDetails = this.events.filter(event => event.startTime.toDateString() === dateString);
          this.eventsMap.set(dateString, eventsDetails);
          console.log(`Events for ${dateString}:`, eventsDetails);
        });
      } ,
        error => {
        console.log(error);
        this.sharedVar.changeException(error);
      }
    )
  );

  }

  readCompType(competitionName: string){
    this.compType = competitionName;
    this.competitionTypeHdr = this.sharedVar.retrieveCompHdr(this.compType);
    this.ngOnInit();
  }

}
