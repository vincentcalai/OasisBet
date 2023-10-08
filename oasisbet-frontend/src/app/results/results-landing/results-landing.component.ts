import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultEvent } from 'src/app/model/result-event.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedVarService } from 'src/app/services/shared-var.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { NgModel } from '@angular/forms';

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

  public selectedDates: string = 'last24Hrs';
  public currentDate: Date = new Date();
  public dateFrom: Date;
  public dateTo: Date;
  public minDate: Date = new Date();
  public maxDate: Date = new Date();
  dateErrorMsg:string = "";

  constructor(public sharedVar: SharedVarService,
    public apiService: ApiService) {
    this.minDate.setDate(this.currentDate.getDate() - 7);
    this.maxDate.setDate(this.currentDate.getDate() + 14);
    this.competitionTypeHdr = this.sharedVar.COMP_HEADER_EPL;
  }

  ngOnInit(): void {
      this.mapDateFromAndDateTo(this.selectedDates);

      this.subscriptions.add(
        this.apiService.retrieveResults(this.compType, this.selectedDates, this.dateFrom, this.dateTo).subscribe((resp: any) => {
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

  mapDateFromAndDateTo(selectedDates: string) {
    if (selectedDates === this.sharedVar.LAST_24_HRS) {
      const last24Hours = this.sharedVar.MILLI_SEC_24_HRS; 
      this.dateFrom = new Date(this.currentDate.getTime() - (this.currentDate.getTimezoneOffset() * 60000) - last24Hours);
      this.dateTo = new Date(this.currentDate.getTime() - (this.currentDate.getTimezoneOffset() * 60000));
    } else if (selectedDates === this.sharedVar.LAST_3_DAYS) {
      const last3Days = this.sharedVar.MILLI_SEC_3_DAYS;
      this.dateFrom = new Date(this.currentDate.getTime() - (this.currentDate.getTimezoneOffset() * 60000) - last3Days);
      this.dateTo = new Date(this.currentDate.getTime() - (this.currentDate.getTimezoneOffset() * 60000));
    } else {
      this.dateFrom = null;
      this.dateTo = null;
    }
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  readCompType(competitionName: string){
    this.compType = competitionName;
    this.competitionTypeHdr = this.sharedVar.retrieveCompHdr(this.compType);
    this.ngOnInit();
  }

  isEventOver(startTime: Date): boolean{
    const currentTime = new Date();
    return currentTime > startTime;
  }
  
  filterResult(){
    this.subscriptions.add(
      this.apiService.retrieveResults(this.compType, this.selectedDates, this.dateFrom, this.dateTo).subscribe((resp: any) => {
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

  validateDateFromLaterThanDateTo(dateFrom: Date, dateTo: Date) {
    if(dateFrom && dateTo && dateFrom > dateTo){
      this.dateErrorMsg = '"From" date cannot be later than "To" date.';
    } else {
      this.dateErrorMsg = "";
    }
  }

}
