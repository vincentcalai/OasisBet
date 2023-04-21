import { Component, OnInit, ViewChild } from '@angular/core';
import { OddsSideNavComponent } from '../odds-side-nav/odds-side-nav.component';

@Component({
  selector: 'app-odds-landing',
  templateUrl: './odds-landing.component.html',
  styleUrls: ['./odds-landing.component.css']
})
export class OddsLandingComponent implements OnInit {

  competitionType: string;

  constructor() { }

  ngOnInit(): void {
  }

  readCompType(compType: string){
    switch(compType) { 
      case 'soccer-epl': { 
         this.competitionType = 'English Premier League';
         break; 
      } 
      case 'soccer-laliga': { 
        this.competitionType = 'La Liga'; 
         break; 
      } 
      case 'soccer-bundesliga': { 
        this.competitionType = 'Bundesliga';
        break; 
      } 
      case 'soccer-serie-a': { 
        this.competitionType = 'Serie A';
        break; 
      } 
      case 'soccer-ligue-one': { 
        this.competitionType = 'Ligue One'; 
        break; 
      } 
      default: { 
        this.competitionType = '';
        break; 
      } 
    } 
  }

}
