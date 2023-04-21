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
});
