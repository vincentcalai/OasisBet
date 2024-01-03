import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsBetSlipComponent } from './odds-bet-slip.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of, throwError } from 'rxjs';
import { BetSlip } from 'src/app/model/bet-slip.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('OddsBetSlipComponent', () => {
  let component: OddsBetSlipComponent;
  let fixture: ComponentFixture<OddsBetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsBetSlipComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsBetSlipComponent);
    component = fixture.componentInstance;
    const mockInitBetSlip = of<void>();
    component.initBetSlip = mockInitBetSlip;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties on initBetSlip subscription', () => {
    const mockInitBetSlip = new Subject<void>();
    component.initBetSlip = mockInitBetSlip;
    component.ngOnInit();
    mockInitBetSlip.next();
    expect(component.placedBetStatus).toBe(1);
    expect(component.responseMsg).toBe('');
    expect(component.errorMsg).toBe('');
    expect(component.totalStake).toBe(0);
  });

  it('should toggle the showSinglesSelection property for singles bet type', () => {
    component.showSinglesSelection = false;
    component.toggleSelection('singles');
    expect(component.showSinglesSelection).toBe(true);
    component.toggleSelection('singles');
    expect(component.showSinglesSelection).toBe(false);
  });

  it('should toggle the showSinglesSelection property for multiples bet type', () => {
    component.showMultiplesSelection = false;
    component.toggleSelection('multiples');
    expect(component.showMultiplesSelection).toBe(true);
    component.toggleSelection('multiples');
    expect(component.showMultiplesSelection).toBe(false);
  });

  it('should remove the specified bet selection and update total stake', () => {
    const betSelection: BetSlip = mockBetSelection1();
    component.betSelections = [betSelection];
    component.totalStake = 10;
    component.onDeleteBetSelection(betSelection);
    expect(component.betSelections.length).toBe(0);
    expect(component.totalStake).toBe(0);
  });

  it('should update the bet amount and potential payout', () => {
    const betSelection: BetSlip = mockBetSelection1();
    component.betSelections = [betSelection];
    const betAmount = '20.00';
    component.onBetAmountChange(betSelection, betAmount);
    expect(betSelection.betAmount).toBe(20.00);
    expect(betSelection.potentialPayout).toBe(65.00);
    expect(component.totalStake).toBe(20.00);
  });

  it('should remove bet selections with zero bet amount and emit removed bet selections', () => {
    const betSelection1: BetSlip = mockBetSelection1();
    const betSelection2: BetSlip = mockBetSelection2();
    const betSelection3: BetSlip = mockBetSelection3();
    component.betSelections = [betSelection1, betSelection2, betSelection3];
    component.placedBetStatus = 1;
    spyOn(component.betSelectionsChange, 'emit');
    component.onPlaceBets();
    expect(component.betSelections.length).toBe(2);
    expect(component.betSelections).toContain(betSelection1);
    expect(component.betSelections).toContain(betSelection3);
    expect(component.placedBetStatus).toBe(2);
    expect(component.betSelectionsChange.emit).toHaveBeenCalledWith([betSelection2]);
  });

  it('should reset bet amounts and total stake, and emit enable bets', () => {
    const betSelection1: BetSlip = mockBetSelection1();
    const betSelection2: BetSlip = mockBetSelection2();
    component.betSelections = [betSelection1, betSelection2];
    component.totalStake = 20;
    component.placedBetStatus = 2;
    spyOn(component.enableBets, 'emit');
    component.onCancelPlaceBets();
    expect(component.betSelections[0].betAmount).toBeNull();
    expect(component.betSelections[0].potentialPayout).toBe(0);
    expect(component.betSelections[1].betAmount).toBeNull();
    expect(component.betSelections[1].potentialPayout).toBe(0);
    expect(component.totalStake).toBe(0);
    expect(component.placedBetStatus).toBe(1);
    expect(component.enableBets.emit).toHaveBeenCalled();
  });

  it('should submit bets successfully and handle the response', () => {
    const betSelections: BetSlip[] = mockBetSlip();
    const account: any = { accId: 100001, balance: 1000 };
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(account);
    spyOn(component.apiService, 'postSubmitBets').and.returnValue(of({ statusCode: 0, resultMessage: 'Bet Submission Success' }));
    spyOn(component.sharedVar, 'changeShowUserNotLoginMsg');
    spyOn(component.router, 'navigate');
    spyOn(component.removeAllBetSelections, 'emit');
    component.betSelections = betSelections;
    component.onFinalConfirmPlaceBets();
    expect(component.sharedVar.submitBetsModel.betSlip).toBe(betSelections);
    expect(component.sharedVar.submitBetsModel.userId).toBe(account.accId);
    expect(component.apiService.postSubmitBets).toHaveBeenCalled();
    expect(component.removeAllBetSelections.emit).toHaveBeenCalled();
    expect(component.responseMsg).toBe('Bet Submission Success');
    expect(component.placedBetStatus).toBe(3);
    expect(component.sharedVar.changeShowUserNotLoginMsg).not.toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });

  it('should submit bets and handle the fail response, when bet submission fail due to status code not 0', () => {
    const betSelections: BetSlip[] = mockBetSlip();
    const account: any = { accId: 100001, balance: 1000 };
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(account);
    spyOn(component.apiService, 'postSubmitBets').and.returnValue(of({ statusCode: 1, resultMessage: 'Bet Submission Failure' }));
    spyOn(component.sharedVar, 'changeShowUserNotLoginMsg');
    spyOn(component.router, 'navigate');
    component.betSelections = betSelections;
    component.onFinalConfirmPlaceBets();
    expect(component.sharedVar.submitBetsModel.betSlip).toBe(betSelections);
    expect(component.sharedVar.submitBetsModel.userId).toBe(account.accId);
    expect(component.apiService.postSubmitBets).toHaveBeenCalled();
    expect(component.responseMsg).toBe('');
    expect(component.errorMsg).toBe('Bet Submission Failure');
    expect(component.placedBetStatus).not.toBe(3);
    expect(component.sharedVar.changeShowUserNotLoginMsg).not.toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });

  it('should throw error, when api call postSubmitBets failed', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    const betSelections: BetSlip[] = mockBetSlip();
    const account: any = { accId: 100001, balance: 1000 };
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(account);
    spyOn(component.apiService, 'postSubmitBets').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    spyOn(component.router, 'navigate');
    component.betSelections = betSelections;
    component.onFinalConfirmPlaceBets();
    expect(component.sharedVar.submitBetsModel.betSlip).toBe(betSelections);
    expect(component.sharedVar.submitBetsModel.userId).toBe(account.accId);
    expect(component.apiService.postSubmitBets).toHaveBeenCalled();
    expect(component.responseMsg).toBe('');
    expect(component.errorMsg).toBe('');
    expect(component.placedBetStatus).not.toBe(3);
    expect(component.sharedVar.changeException).toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to account page when user is not logged in', () => {
    const account: any = {};
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(account);
    spyOn(component.sharedVar, 'changeShowUserNotLoginMsg');
    spyOn(component.apiService, 'postSubmitBets');
    spyOn(component.router, 'navigate');
    spyOn(component.removeAllBetSelections, 'emit');
    component.onFinalConfirmPlaceBets();
    expect(component.apiService.postSubmitBets).not.toHaveBeenCalled();
    expect(component.removeAllBetSelections.emit).not.toHaveBeenCalled();
    expect(component.responseMsg).toBe('');
    expect(component.placedBetStatus).not.toBe(3);
    expect(component.sharedVar.changeShowUserNotLoginMsg).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalled();
  });
})

function mockBetSelection1(): any {
  return {
    eventId: 1000001,
    betSelection: '02',
    betAmount: 10,
    eventDesc: 'Liverpool vs Arsenal',
    compType: 'soccer_epl',
    startTime: new Date(),
    betSelectionName: 'Draw',
    betTypeCd: '01',
    odds: 3.25,
    potentialPayout: 32.50
  };
}


function mockBetSelection2(): any {
  return  {
    eventId: 1000002,
    betSelection: '01',
    betAmount: 0,
    eventDesc: 'Chelsea vs Luton Town',
    compType: 'soccer_epl',
    startTime: new Date(),
    betSelectionName: 'Chelsea',
    betTypeCd: '01',
    odds: 1.22,
    potentialPayout: 0
  };
}

function mockBetSelection3(): any {
  return {
    eventId: 1000003,
    betSelection: '03',
    betAmount: 10,
    eventDesc: 'Fulham vs Manchester City',
    compType: 'soccer_epl',
    startTime: new Date(),
    betSelectionName: 'Manchester City',
    betTypeCd: '01',
    odds: 1.15,
    potentialPayout: 11.50
  };
}

function mockBetSlip(): BetSlip[] {
  return [
    {
      eventId: 1000001,
      betSelection: '02',
      betAmount: 10,
      eventDesc: 'Liverpool vs Arsenal',
      compType: 'soccer_epl',
      startTime: new Date(),
      betSelectionName: 'Draw',
      betTypeCd: '01',
      odds: 3.25,
      potentialPayout: 32.50
    },
    {
      eventId: 1000002,
      betSelection: '01',
      betAmount: 10,
      eventDesc: 'Chelsea vs Luton Town',
      compType: 'soccer_epl',
      startTime: new Date(),
      betSelectionName: 'Chelsea',
      betTypeCd: '01',
      odds: 1.22,
      potentialPayout: 12.20
    }
  ];
}

