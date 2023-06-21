import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddsLandingComponent } from './odds-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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

});
