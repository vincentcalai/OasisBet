import { TestBed } from '@angular/core/testing';

import { ReactiveFormService } from './reactive-form.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('ReactiveFormService', () => {
  let service: ReactiveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
    });
    service = TestBed.inject(ReactiveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
