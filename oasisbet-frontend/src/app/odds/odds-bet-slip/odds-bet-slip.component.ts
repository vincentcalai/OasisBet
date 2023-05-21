import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BetSlip } from 'src/app/model/bet-slip.model';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-odds-bet-slip',
  templateUrl: './odds-bet-slip.component.html',
  styleUrls: ['./odds-bet-slip.component.css']
})
export class OddsBetSlipComponent implements OnInit {

  public responseMsg: string = '';
  public errorMsg: string = '';

  public showSinglesSelection: boolean = true;
  public showMultiplesSelection: boolean = true;
  public totalStake: number = 0;
  public placedBetConfirmFlag: boolean = false;

  @Input() betSelections: BetSlip[];
  @Output() removedBetSelection: EventEmitter<BetSlip> = new EventEmitter<BetSlip>();

  public beforeCfmBetSelections: BetSlip[];

  constructor(public sharedVar: SharedVarService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.responseMsg = "";
    this.errorMsg = "";
  }

  toggleSelection(selectionType: string): void {
    if (selectionType === 'singles') {
      this.showSinglesSelection = !this.showSinglesSelection;
    } else if (selectionType === 'multiples') {
      this.showMultiplesSelection = !this.showMultiplesSelection;
    }
  }

  onDeleteBetSelection(betSelection: BetSlip){
    this.betSelections = this.betSelections.filter(e => !(e.eventId === betSelection.eventId && e.betSelection === betSelection.betSelection));
    this.removedBetSelection.emit(betSelection);
  }

  onBetAmountChange(betSlipItem: BetSlip, betAmount: string) {
    const regex = /^(?!0\d*$)\d{1,4}(?:\.\d{0,2})?$/;
    if(!regex.test(betAmount)){
      betSlipItem.betAmount = null;
      betSlipItem.potentialPayout = 0;
    } else {
      betSlipItem.betAmount = parseFloat(Number(betAmount).toFixed(2));
      betSlipItem.potentialPayout = parseFloat((betSlipItem.betAmount * betSlipItem.odds).toFixed(2));
    }
    this.totalStake = 0;
    this.betSelections.forEach(selection => this.totalStake =  this.totalStake + selection.betAmount);
  }

  onPlaceBets(){
    //store all current bet selections into beforeCfmBetSelections
    this.beforeCfmBetSelections = this.betSelections;

    //remove bet selections that does not have bet amount
    this.betSelections = this.betSelections.filter(e => e.betAmount !== 0 && e.potentialPayout !== 0);
    this.placedBetConfirmFlag = true;
  }

  onCancelPlaceBets(){
    this.betSelections.forEach(selection => {
      selection.betAmount = null;
      selection.potentialPayout = 0;
    });
    this.totalStake = 0;
    this.placedBetConfirmFlag = false;

    //restore previous bet selections (those that were selected but without bet amount) before place bet
    this.betSelections = this.beforeCfmBetSelections;
  }

  onFinalConfirmPlaceBets(){
    //call backend api here to place bet
    this.placedBetConfirmFlag = false;

    //if success, clear the current bet selections
    // this.beforeCfmBetSelections.splice(0);
    // this.betSelections.splice(0);
    this.responseMsg = "Bet successfully placed!";
  }

}
