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

  it('should retrieve results and convert the response to Date format', () => {
    const mockResponse = mockResultsResponse();
    spyOn(component.apiService, 'retrieveResults').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.apiService.retrieveResults).toHaveBeenCalled();
    expect(component.events.length).toBe(2);
    expect(component.events[0].startTime instanceof Date).toBeTrue();
    expect(component.events[1].startTime instanceof Date).toBeTrue();
  });

  it('should throw error, when api call retrieveResults failed', () => {
    const error = new HttpErrorResponse({ status: 500 });
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

  function mockResultsResponse(): any {
    return {
      resultEvent:
      [
        {
          eventId: 1000001,
          competition: 'soccer_epl',
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
          competition: 'soccer_epl',
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
