import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetEvent } from 'src/app/model/bet-event.model';
import { H2HBetSelection } from 'src/app/model/h2h-bet-selection.model';
import { ResultEvent } from 'src/app/model/result-event.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-results-landing',
  templateUrl: './results-landing.component.html',
  styleUrls: ['./results-landing.component.css']
})
export class ResultsLandingComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();

  compType: string = this.sharedVar.API_SOURCE_COMP_TYPE_EPL;
  competitionTypeHdr: string;
  public events : ResultEvent[];

  constructor(public sharedVar: SharedVarService,
    public apiService: ApiService) {
    this.competitionTypeHdr = this.sharedVar.COMP_HEADER_EPL;
  }

  ngOnInit(): void {
      this.subscriptions.add(
        this.apiService.retrieveResults(this.compType).subscribe((resp: any) => {
          this.events = resp.resultEvent;

          //convert json response from String to Date format
          this.events.map(event => event.startTime = new Date(event.startTime));
        } ,
          error => {
          console.log(error);
          this.sharedVar.changeException(error);
        }
      )
    );
  }

  ngOnDestory(){
    this.subscriptions.unsubscribe();
  }

  readCompType(competitionName: string){
    this.compType = competitionName;
    this.competitionTypeHdr = this.sharedVar.retrieveCompHdr(this.compType);
    this.ngOnInit();
  }

}
