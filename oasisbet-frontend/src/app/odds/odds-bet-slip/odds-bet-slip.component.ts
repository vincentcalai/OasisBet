import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  public placedBetStatus: number = 1; //before place bet = 1
                                      //after place bet, before confirm = 2
                                      //after confirm, bet successful = 3

  @Input() betSelections: BetSlip[];
  @Output() betSelectionsChange: EventEmitter<BetSlip[]> = new EventEmitter<BetSlip[]>();
  @Output() removedBetSelection: EventEmitter<BetSlip> = new EventEmitter<BetSlip>();
  @Output() removeAllBetSelections = new EventEmitter<void>();

  private betSlipSubscription: Subscription;

  @Input() initBetSlip: Observable<void>;

  constructor(public sharedVar: SharedVarService) { }

  ngOnInit(): void {
    this.betSlipSubscription = this.initBetSlip.subscribe(() => {
      this.placedBetStatus = 1;
      this.responseMsg = "";
      this.errorMsg = "";
    });
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
    //remove bet selections that does not have bet amount
    const removedBetSelections = this.betSelections.filter(e => e.betAmount === 0 || e.potentialPayout === 0);
    this.betSelections = this.betSelections.filter(e => e.betAmount !== 0 && e.potentialPayout !== 0);
    this.placedBetStatus = 2;
    this.betSelectionsChange.emit(removedBetSelections);
  }

  onCancelPlaceBets(){
    this.betSelections.forEach(selection => {
      selection.betAmount = null;
      selection.potentialPayout = 0;
    });
    this.totalStake = 0;
    this.placedBetStatus = 1;
  }

  onFinalConfirmPlaceBets(){
    //call backend api here to place bet

    //if success, clear the current bet selections
    this.removeAllBetSelections.emit();

    this.responseMsg = "Bet successfully placed!";
    this.placedBetStatus = 3;
  }

  ngOnDestroy() {
    this.betSlipSubscription.unsubscribe();
  }

}
