import { TestBed } from '@angular/core/testing';

import { ReactiveFormService } from './reactive-form.service';

describe('ReactiveFormService', () => {
  let service: ReactiveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
