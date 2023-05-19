import { Component, Input, OnInit } from '@angular/core';
import { BetEvent } from 'src/app/model/bet-event.model';

@Component({
  selector: 'app-odds-bet-slip',
  templateUrl: './odds-bet-slip.component.html',
  styleUrls: ['./odds-bet-slip.component.css']
})
export class OddsBetSlipComponent implements OnInit {
  showSinglesSelection: boolean = false;
  showMultiplesSelection: boolean = false;

  @Input() betSelection: BetEvent;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
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
