import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsLandingComponent } from './odds-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BetSlip } from 'src/app/model/bet-slip.model';
import { BetEvent } from 'src/app/model/bet-event.model';

describe('OddsLandingComponent', () => {
  let component: OddsLandingComponent;
  let fixture: ComponentFixture<OddsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddsLandingComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize events, eventDates, and eventsMap on ngOnInit for 2 different date events', () => {
    const mockResponse = {
      betEvent: [
        {
          eventId: 1,
          eventDesc: 'Event 1',
          startTime: '2023-05-15T12:00:00Z',
          competition: 'EPL',
          teamsDetails: {},
          h2hEventOdds: {}
        },
        {
          eventId: 2,
          eventDesc: 'Event 2',
          startTime: '2023-05-16T15:30:00Z',
          competition: 'EPL',
          teamsDetails: {},
          h2hEventOdds: {}
        },
      ],
    };
    spyOn(component.apiService, 'retrieveOdds').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.apiService.retrieveOdds).toHaveBeenCalledWith(component.compType);
    expect(component.events.length).toEqual(2);
    expect(component.eventDates.length).toEqual(2);
    expect(component.eventsMap.size).toEqual(2);
  });

  it('should initialize events, eventDates, and eventsMap on ngOnInit for 2 same date events', () => {
    const mockResponse = {
      betEvent: [
        {
          eventId: 1000001,
          eventDesc: 'Event 1',
          startTime: '2023-05-15T12:00:00Z',
          competition: 'EPL',
          teamsDetails: {},
          h2hEventOdds: {}
        },
        {
          eventId: 1000002,
          eventDesc: 'Event 2',
          startTime: '2023-05-15T15:30:00Z',
          competition: 'EPL',
          teamsDetails: {},
          h2hEventOdds: {}
        },
      ],
    };
    spyOn(component.apiService, 'retrieveOdds').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.apiService.retrieveOdds).toHaveBeenCalledWith(component.compType);
    expect(component.events.length).toEqual(2);
    expect(component.eventDates.length).toEqual(1);
    expect(component.eventsMap.size).toEqual(1);
    expect(component.eventsMap.get('Mon May 15 2023').length).toEqual(2);
  });

  it('should update selected bets based on existing bet slips', () => {
    const mockResponse = {
      betEvent: [
        {
          eventId: 1000001,
          eventDesc: 'Event 1',
          startTime: '2023-05-15T12:00:00Z',
          competition: 'EPL',
          teamsDetails: {},
          h2hEventOdds: {}
        },
      ],
    };
    spyOn(component.apiService, 'retrieveOdds').and.returnValue(of(mockResponse));
    const betSlip = mockBetSlip();
    component.selectedBets.push(betSlip);
    component.ngOnInit();
    expect(component.apiService.retrieveOdds).toHaveBeenCalledWith(component.compType);
    expect(component.events[0].betSelection.homeSelected).toBeTruthy();
    expect(component.selectedBets).toEqual([betSlip]);
  });

  it('should throw error, when api call retrieveOdds failed', () => {
    const error = new HttpErrorResponse({ status: 500 });
    spyOn(component.apiService, 'retrieveOdds').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    component.ngOnInit();
    expect(component.apiService.retrieveOdds).toHaveBeenCalled();
    expect(component.sharedVar.changeException).toHaveBeenCalled();
  });

  it('should disable bets and remove each bet from the bet slip', () => {
    const removedBetSlip: BetSlip[] = mockBetSlips();
    component.disableBets = false;
    spyOn(component, 'removeBet');
    component.updateBetSlip(removedBetSlip);
    expect(component.disableBets).toBeTrue();
    expect(component.removeBet).toHaveBeenCalledTimes(removedBetSlip.length);
    expect(component.removeBet).toHaveBeenCalledWith(removedBetSlip[0]);
  });

  it('should enable bets', () => {
    component.disableBets = true;
    component.onEnableBets();
    expect(component.disableBets).toBeFalse();
  });

  it('should update the competition type and call ngOnInit', () => {
    const competitionName = 'soccer_epl';
    spyOn(component, 'ngOnInit');
    spyOn(component.sharedVar, 'retrieveCompHdr').and.returnValue('English Premier League');
    component.readCompType(competitionName);
    expect(component.compType).toBe(competitionName);
    expect(component.competitionTypeHdr).toBe('English Premier League');
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should remove all bets and reset properties', () => {
    const mockEvents = mockBetEvents();
    component.events = mockEvents;
    component.isBetSlipClean = false;
    component.disableBets = true;
    component.removeAllBets();
    expect(component.events[0].betSelection.homeSelected).toBe(false);
    expect(component.events[0].betSelection.drawSelected).toBe(false);
    expect(component.events[0].betSelection.awaySelected).toBe(false);
    expect(component.events[1].betSelection.homeSelected).toBe(false);
    expect(component.events[1].betSelection.drawSelected).toBe(false);
    expect(component.events[1].betSelection.awaySelected).toBe(false);
    expect(component.events[2].betSelection.homeSelected).toBe(false);
    expect(component.events[2].betSelection.drawSelected).toBe(false);
    expect(component.events[2].betSelection.awaySelected).toBe(false);
    expect(component.isBetSlipClean).toBe(true);
    expect(component.disableBets).toBe(false);
  });

  it('should clear the existing bets from previous submission and should have correct details for first bet selection that was added into the bet slip after a successful bet submission', () => {
    const mockEvent = mockBetEvent();
    component.isBetSlipClean = true;
    component.selectedBets = mockBetSlips();
    component.betSlipSubject = new BehaviorSubject<any>(null);
    const selection = '01';
    component.selectBetSelection(mockEvent, selection);
    expect(component.selectedBets.length).toBe(1);
    expect(component.selectedBets[0].eventId).toBe(mockEvent.eventId);
    expect(component.selectedBets[0].eventDesc).toBe(mockEvent.eventDesc);
    expect(component.selectedBets[0].betTypeCd).toBe(component.sharedVar.BET_TYPE_CD_H2H);
    expect(component.selectedBets[0].betSelection).toBe(component.sharedVar.BET_SELECTION_H2H_HOME);
    expect(component.selectedBets[0].betSelectionName).toBe(mockEvent.teamsDetails.homeTeam);
    expect(component.selectedBets[0].odds).toBe(mockEvent.h2hEventOdds.homeOdds);
    expect(component.selectedBets[0].startTime).toBe(mockEvent.startTime);
    expect(component.selectedBets[0].compType).toBe(mockEvent.competition);
  });

  it('should remove bet selection from the bet slip for unselecting a bet from UI', () => {
    const mockEvent = mockBetEvent2();
    component.isBetSlipClean = false;
    component.selectedBets = mock5BetSlips();
    component.betSlipSubject = new BehaviorSubject<any>(null);
    const selection = '01';
    component.selectBetSelection(mockEvent, selection);
    expect(component.selectedBets.length).toBe(4);
  });

  it('should return max bet allowed error when bet selection is more than 5', () => {
    const mockEvent = mockBetEvent();
    component.isBetSlipClean = false;
    component.selectedBets = mock5BetSlips();
    component.betSlipSubject = new BehaviorSubject<any>(null);
    const selection = '01';
    component.selectBetSelection(mockEvent, selection);
    expect(component.selectedBets.length).toBe(5);
    expect(component.maxBetMsg).toBe("Maximum bet in a bet slip is 5.");
  });

  it('should clear bet selected on UI once bet selection is removed from bet slip', () => {
    const mockEvents = mockBetEvents();
    const mockBet1 = mockBetSlip();
    const mockBet2 = mockBetSlip2();
    const mockBet3 = mockBetSlip3();
    component.selectedBets = mockBetSlips();
    component.events = mockEvents;
    component.maxBetMsg = "Max bet error message";
    expect(component.selectedBets.length).toBe(3);
    component.removeBet(mockBet1);
    component.removeBet(mockBet2);
    component.removeBet(mockBet3);
    expect(component.selectedBets.length).toBe(0);
    expect(component.events[0].betSelection.homeSelected).toBe(false);
    expect(component.events[1].betSelection.homeSelected).toBe(false);
    expect(component.events[2].betSelection.homeSelected).toBe(false);
    expect(component.events[0].betSelection.drawSelected).toBe(false);
    expect(component.events[1].betSelection.drawSelected).toBe(false);
    expect(component.events[2].betSelection.drawSelected).toBe(false);
    expect(component.events[0].betSelection.awaySelected).toBe(false);
    expect(component.events[1].betSelection.awaySelected).toBe(false);
    expect(component.events[2].betSelection.awaySelected).toBe(false);
  });

  it('should clear max bet error message once the bet slip is less than 5', () => {
    const mockEvents = mockBetEvents();
    const mockBet = mockBetSlip();
    component.selectedBets = mock5BetSlips();
    component.events = mockEvents;
    component.maxBetMsg = "Max bet error message";
    expect(component.selectedBets.length).toBe(5);
    component.removeBet(mockBet);
    expect(component.selectedBets.length).toBe(4);
    expect(component.maxBetMsg).toBe("");
    expect(component.events[0].betSelection.homeSelected).toBe(false);
  });

  it('should remove bet from bet slip if the event for the removed bet is found in bet slip', () => {
      const mockEvents = mockBetEvents();
      const mockBet = mockBetSlip();
      component.selectedBets = mockBetSlips();
      component.events = mockEvents;
      component.removeBet(mockBet);
      expect(component.selectedBets.length).toBe(2);
      expect(component.selectedBets[0].eventId).toBe(1000002);
      expect(component.selectedBets[1].eventId).toBe(1000003);
  });

  function mockBetSlip(): BetSlip {
    return {
      eventId: 1000001,
      eventDesc: "Leicester City vs Manchester United",
      compType: "soccer_epl",
      startTime: new Date(),
      betSelection: "01",
      betSelectionName: 'Leicester City',
      betTypeCd: "01",
      odds: 5.00,
      betAmount: 5.00,
      potentialPayout: 25.00
    };
  }

  function mockBetSlip2(): BetSlip {
    return {
      eventId: 1000002,
      eventDesc: "Manchester City vs Leeds United",
      compType: "soccer_epl",
      startTime: new Date(),
      betSelection: "02",
      betSelectionName: 'Leicester City',
      betTypeCd: "01",
      odds: 4.00,
      betAmount: 5.00,
      potentialPayout: 20.00
    };
  }

  function mockBetSlip3(): BetSlip {
    return {
      eventId: 1000003,
      eventDesc: "Arsenal vs Liverpool",
      compType: "soccer_epl",
      startTime: new Date(),
      betSelection: "03",
      betSelectionName: 'Liverpool',
      betTypeCd: "01",
      odds: 3.00,
      betAmount: 5.00,
      potentialPayout: 15.00
    };
  }

  function mockBetSlips(): BetSlip[] {
      return [
        {
          eventId: 1000001,
          eventDesc: "Leicester City vs Manchester United",
          compType: "soccer_epl",
          startTime: new Date(),
          betSelection: "01",
          betSelectionName: 'Leicester City',
          betTypeCd: "01",
          odds: 5.00,
          betAmount: 5.00,
          potentialPayout: 25.00
        },
        {
          eventId: 1000002,
          eventDesc: "Manchester City vs Leeds United",
          compType: "soccer_epl",
          startTime: new Date(),
          betSelection: "02",
          betSelectionName: 'Draw',
          betTypeCd: "01",
          odds: 3.50,
          betAmount: 10.00,
          potentialPayout: 35.50
        },
        {
          eventId: 1000003,
          eventDesc: "Arsenal vs Liverpool",
          compType: "soccer_epl",
          startTime: new Date(),
          betSelection: "03",
          betSelectionName: 'Liverpool',
          betTypeCd: "01",
          odds: 3.00,
          betAmount: 10.00,
          potentialPayout: 30.00
        }
      ];
  }

  function mockBetEvents():BetEvent[] {
    return [
        {
          eventId: 1000001,
          eventDesc: 'Event 1',
          startTime: new Date(),
          competition: 'EPL',
          teamsDetails: {homeTeam: "", awayTeam: ""},
          h2hEventOdds: {eventId: 1000001, homeOdds: 1.50, drawOdds: 3.55, awayOdds: 5.60},
          betSelection: {homeSelected: true, drawSelected: false, awaySelected: false}
        },
        {
          eventId: 1000002,
          eventDesc: 'Event 2',
          startTime: new Date(),
          competition: 'EPL',
          teamsDetails: {homeTeam: "", awayTeam: ""},
          h2hEventOdds: {eventId: 1000002, homeOdds: 1.50, drawOdds: 3.55, awayOdds: 5.60},
          betSelection: {homeSelected: false, drawSelected: true, awaySelected: false}
        },
        {
          eventId: 1000003,
          eventDesc: 'Event 3',
          startTime: new Date(),
          competition: 'EPL',
          teamsDetails: {homeTeam: "", awayTeam: ""},
          h2hEventOdds: {eventId: 1000003, homeOdds: 1.50, drawOdds: 3.55, awayOdds: 5.60},
          betSelection: {homeSelected: false, drawSelected: false, awaySelected: true}
        }
      ];
  }

  function mock5BetSlips(): BetSlip[] {
    return [
      {
        eventId: 1000001,
        eventDesc: "Leicester City vs Manchester United",
        compType: "soccer_epl",
        startTime: new Date(),
        betSelection: "01",
        betSelectionName: 'Leicester City',
        betTypeCd: "01",
        odds: 5.00,
        betAmount: 5.00,
        potentialPayout: 25.00
      },
      {
        eventId: 1000002,
        eventDesc: "Manchester City vs Leeds United",
        compType: "soccer_epl",
        startTime: new Date(),
        betSelection: "02",
        betSelectionName: 'Draw',
        betTypeCd: "01",
        odds: 3.50,
        betAmount: 10.00,
        potentialPayout: 35.50
      },
      {
        eventId: 1000003,
        eventDesc: "Arsenal vs Liverpool",
        compType: "soccer_epl",
        startTime: new Date(),
        betSelection: "02",
        betSelectionName: 'Draw',
        betTypeCd: "01",
        odds: 3.50,
        betAmount: 10.00,
        potentialPayout: 35.50
      },
      {
        eventId: 1000004,
        eventDesc: "Tottenham Hotspur vs West Ham United",
        compType: "soccer_epl",
        startTime: new Date(),
        betSelection: "02",
        betSelectionName: 'Draw',
        betTypeCd: "01",
        odds: 3.50,
        betAmount: 10.00,
        potentialPayout: 35.50
      },
      {
        eventId: 1000005,
        eventDesc: "Bourthmouth vs Sheffield United",
        compType: "soccer_epl",
        startTime: new Date(),
        betSelection: "02",
        betSelectionName: 'Draw',
        betTypeCd: "01",
        odds: 3.50,
        betAmount: 10.00,
        potentialPayout: 35.50
      }
    ];
  }

  function mockBetEvent():BetEvent {
    return {
      eventId: 1000001,
      eventDesc: 'Event 1',
      startTime: new Date(),
      competition: 'EPL',
      teamsDetails: {homeTeam: "", awayTeam: ""},
      h2hEventOdds: {eventId: 1000001, homeOdds: 1.50, drawOdds: 3.55, awayOdds: 5.60},
      betSelection: {homeSelected: false, drawSelected: false, awaySelected: false}
    };
  }

  function mockBetEvent2():BetEvent {
    return {
      eventId: 1000001,
      eventDesc: 'Event 1',
      startTime: new Date(),
      competition: 'EPL',
      teamsDetails: {homeTeam: "", awayTeam: ""},
      h2hEventOdds: {eventId: 1000001, homeOdds: 1.50, drawOdds: 3.55, awayOdds: 5.60},
      betSelection: {homeSelected: true, drawSelected: false, awaySelected: false}
    };
  }
});
