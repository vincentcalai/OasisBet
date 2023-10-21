import { TestBed } from '@angular/core/testing';

import { SharedMethodsService } from './shared-methods.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SharedMethodsService', () => {
  let service: SharedMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
    });
    service = TestBed.inject(SharedMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
