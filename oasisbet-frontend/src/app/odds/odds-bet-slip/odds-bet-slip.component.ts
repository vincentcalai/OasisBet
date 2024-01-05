import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { BetSlip } from 'src/app/model/bet-slip.model';
import { BetsModel } from 'src/app/model/bets.model';
import { ResponseModel } from 'src/app/model/response.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AuthService } from 'src/app/services/auth/auth.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-odds-bet-slip',
  templateUrl: './odds-bet-slip.component.html',
  styleUrls: ['./odds-bet-slip.component.css']
})
export class OddsBetSlipComponent implements OnInit {

  public responseMsg: string = '';
  @Input() public errorMsg: string = '';

  public showSinglesSelection: boolean = true;
  public showMultiplesSelection: boolean = true;
  public totalStake: number = 0;

  public placedBetStatus: number = 1; //before place bet = 1
                                      //after place bet, before confirm = 2
                                      //after confirm, bet successful = 3

  @Input() betSelections: BetSlip[];
  @Output() enableBets: EventEmitter<void> = new EventEmitter<void>();
  @Output() betSelectionsChange: EventEmitter<BetSlip[]> = new EventEmitter<BetSlip[]>();
  @Output() removedBetSelection: EventEmitter<BetSlip> = new EventEmitter<BetSlip>();
  @Output() removeAllBetSelections: EventEmitter<void> = new EventEmitter<void>();

  public betSlipSubscription: Subscription;
  public subscriptions: Subscription = new Subscription();

  @Input() initBetSlip: Observable<void>;

  constructor(
    public sharedVar: SharedVarService,
    public apiService: ApiService,
    public router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.betSlipSubscription = this.initBetSlip.subscribe(() => {
      this.placedBetStatus = 1;
      this.responseMsg = "";
      this.errorMsg = "";
      this.totalStake = 0;
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
    this.totalStake = 0;
    this.betSelections.forEach(selection => this.totalStake =  this.totalStake + selection.betAmount);
    this.removedBetSelection.emit(betSelection);
    if(this.betSelections.length === 0){
      this.placedBetStatus = 1;
      this.enableBets.emit();
    }
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
    this.errorMsg = "";

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
    this.enableBets.emit();
  }

  onFinalConfirmPlaceBets(){
    // call backend api here to place bet
    this.sharedVar.submitBetsModel.betSlip = this.betSelections;
    const account: AccountModel = this.authService.getRetrievedAccDetails();
    if(!account || !account.accId){
      this.sharedVar.changeShowUserNotLoginMsg(this.sharedVar.USER_NOT_LOGGED_IN);
      this.router.navigate(['account']);
      return;
    }
    this.sharedVar.submitBetsModel.userId = account.accId;
    this.subscriptions.add(
      this.apiService.postSubmitBets().subscribe( (resp: any) => {
        if(resp.statusCode == 4){
          this.authService.clearlocalStorage();
          this.sharedVar.changeShowUserNotLoginMsg(resp.resultMessage);
          this.router.navigate(['account']);
          return;
        }

        if (resp.statusCode != 0) {
          this.errorMsg = resp.resultMessage;
          resp.resultMessage = "";
        } else {
          //if success, clear the current bet selections
          this.removeAllBetSelections.emit();

          this.responseMsg = resp.resultMessage;
          this.placedBetStatus = 3;

          let accountModel: AccountModel = new AccountModel();
          accountModel = this.authService.getRetrievedAccDetails();
          if (resp && resp.account && accountModel) {
            accountModel.balance = resp.account.balance;
            localStorage.setItem(ACC_DETAILS, JSON.stringify(accountModel));
          }
        }
      } ,
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log(error);
            this.sharedVar.changeException(error.message);
          }
      })
    );
  }

  ngOnDestroy() {
    this.betSlipSubscription.unsubscribe();
    this.subscriptions.unsubscribe();
  }

}
