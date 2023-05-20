import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BetEvent } from 'src/app/model/bet-event.model';
import { BetSlip } from 'src/app/model/bet-slip.model';

@Component({
  selector: 'app-odds-bet-slip',
  templateUrl: './odds-bet-slip.component.html',
  styleUrls: ['./odds-bet-slip.component.css']
})
export class OddsBetSlipComponent implements OnInit {
  showSinglesSelection: boolean = false;
  showMultiplesSelection: boolean = false;

  @Input() betSelection: BetSlip[];

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges() {
      // Handle changes to selectedEvents and update the displayed selection
      console.log('betSelection input value:', this.betSelection);
  }

  toggleSelection(selectionType: string): void {
    if (selectionType === 'singles') {
      this.showSinglesSelection = !this.showSinglesSelection;
    } else if (selectionType === 'multiples') {
      this.showMultiplesSelection = !this.showMultiplesSelection;
    }
  }

}
