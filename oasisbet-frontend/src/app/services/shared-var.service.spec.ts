import { TestBed } from '@angular/core/testing';

import { SharedVarService } from './shared-var.service';

describe('SharedVarService', () => {
  let service: SharedVarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedVarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct competition header', () => {
    const header1 = service.retrieveCompHdr('soccer_epl');
    const header2 = service.retrieveCompHdr('soccer_spain_la_liga');
    const header3 = service.retrieveCompHdr('soccer_germany_bundesliga');
    const header4 = service.retrieveCompHdr('soccer_italy_serie_a');
    const header5 = service.retrieveCompHdr('soccer_france_ligue_one');
    expect(header1).toBe('English Premier League');
    expect(header2).toBe('La Liga');
    expect(header3).toBe('Bundesliga');
    expect(header4).toBe('Serie A');
    expect(header5).toBe('Ligue One');
  });

  it('should return correct bet type name', () => {
    const header1 = service.mapBetTypeCd('01');
    expect(header1).toBe('1X2');
  });

  it('should return empty header for invalid bet type code', () => {
    const header1 = service.mapBetTypeCd('999');
    expect(header1).toBe('');
  });

  it('should update the exceptionSource with the provided status', () => {
    const status = 'Some error status';
    service.changeException(status);
    service.exceptionSource.subscribe(value => {
      expect(value).toBe(status);
    });
  });

});
