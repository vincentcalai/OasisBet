import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsLandingComponent } from './results-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ResultEvent } from 'src/app/model/result-event.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('ResultsLandingComponent', () => {
  let component: ResultsLandingComponent;
  let fixture: ComponentFixture<ResultsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsLandingComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve results and convert the response to Date format for last24Hrs', () => {
    const mockResponse = mockResultsResponse();
    spyOn(component.apiService, 'retrieveResults').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.apiService.retrieveResults).toHaveBeenCalled();
    expect(component.events.length).toBe(2);
    expect(component.events[0].startTime instanceof Date).toBeTrue();
    expect(component.events[1].startTime instanceof Date).toBeTrue();
    expect(component.dateFrom).not.toBe(null);
    expect(component.dateTo).not.toBe(null);
  });

  it('should retrieve results and convert the response to Date format for last3Days', () => {
    const mockResponse = mockResultsResponse();
    component.selectedDates = 'last3Days';
    spyOn(component.apiService, 'retrieveResults').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.apiService.retrieveResults).toHaveBeenCalled();
    expect(component.events.length).toBe(2);
    expect(component.events[0].startTime instanceof Date).toBeTrue();
    expect(component.events[1].startTime instanceof Date).toBeTrue();
    expect(component.dateFrom).not.toBe(null);
    expect(component.dateTo).not.toBe(null);
  });

  it('should retrieve results and convert the response to Date format for others', () => {
    const mockResponse = mockResultsResponse();
    spyOn(component.apiService, 'retrieveResults').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.apiService.retrieveResults).toHaveBeenCalled();
    expect(component.events.length).toBe(2);
    expect(component.events[0].startTime instanceof Date).toBeTrue();
    expect(component.events[1].startTime instanceof Date).toBeTrue();
  });

  it('should throw error, when api call retrieveResults failed', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    spyOn(component.apiService, 'retrieveResults').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    component.ngOnInit();
    expect(component.apiService.retrieveResults).toHaveBeenCalled();
    expect(component.sharedVar.changeException).toHaveBeenCalled();
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

  it('should return true when the current time is greater than the start time', () => {
    const startTime = new Date('2023-08-28T12:00:00');
    const result = component.isEventOver(startTime);
    expect(result).toBeTrue();
  });

  it('should return false when the current time is less than the start time', () => {
    const startTime = new Date('2099-08-30T12:00:00'); // Set a start time in the future
    const result = component.isEventOver(startTime);
    expect(result).toBeFalse(); // The event should not be over
  });

  it('should set dateErrorMsg when dateFrom is later than dateTo', () => {
    const dateFrom = new Date('2023-08-30T12:00:00');
    const dateTo = new Date('2023-08-28T12:00:00');
    component.validateDateFromLaterThanDateTo(dateFrom, dateTo);
    expect(component.dateErrorMsg).toEqual(component.sharedVar.INVALID_DATE_FROM_AND_TO_ERR_MSG);
  });

  it('should not set dateErrorMsg when dateFrom is earlier than dateTo', () => {
    const dateFrom = new Date('2023-08-28T12:00:00');
    const dateTo: Date = new Date('2023-08-30T12:00:00');
    component.validateDateFromLaterThanDateTo(dateFrom, dateTo);
    expect(component.dateErrorMsg).toEqual('');
  });

  it('should not set dateErrorMsg when either dateFrom or dateTo is not defined', () => {
    const dateFrom = new Date('2023-08-28T12:00:00');
    const dateTo: Date = undefined;
    component.validateDateFromLaterThanDateTo(dateFrom, dateTo);
    expect(component.dateErrorMsg).toEqual('');
  });

  it('should retrieve results and convert the response to Date format when performing filter', () => {
    const mockResponse = mockResultsResponse();
    spyOn(component.apiService, 'retrieveResults').and.returnValue(of(mockResponse));
    component.filterResult();
    expect(component.apiService.retrieveResults).toHaveBeenCalled();
    expect(component.events.length).toBe(2);
    expect(component.events[0].startTime instanceof Date).toBeTrue();
    expect(component.events[1].startTime instanceof Date).toBeTrue();
  })

  it('should throw error, when api call when performing filter failed', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    spyOn(component.apiService, 'retrieveResults').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    component.filterResult();
    expect(component.apiService.retrieveResults).toHaveBeenCalled();
    expect(component.sharedVar.changeException).toHaveBeenCalled();
  });

  function mockResultsResponse(): any {
    return {
      resultEvent:
      [
        {
          eventId: 1000001,
          compType: 'soccer_epl',
          eventDesc: 'Arsenal vs Liverpool',
          startTime: '2023-05-15T10:00:00Z',
          completed: false,
          homeTeam: 'Arsenal',
          awayTeam: 'Liverpool',
          score: '1-1',
          lastUpdated: '2023-05-14T10:00:00Z'
        },
        {
          eventId: 1000002,
          compType: 'soccer_epl',
          eventDesc: 'Chelsea vs Leicester City',
          startTime: '2023-05-15T12:00:00Z',
          completed: false,
          homeTeam: 'Chelsea',
          awayTeam: 'Leicester City',
          score: '3-1',
          lastUpdated: '2023-05-14T10:00:00Z'
        }
      ]
    }
  }
});
