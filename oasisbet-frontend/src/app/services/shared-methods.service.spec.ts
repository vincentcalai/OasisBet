import { TestBed } from '@angular/core/testing';

import { SharedMethodsService } from './shared-methods.service';

describe('SharedMethodsService', () => {
  let service: SharedMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
