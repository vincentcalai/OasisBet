import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxHistComponent } from './trx-hist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TrxHistComponent', () => {
  let component: TrxHistComponent;
  let fixture: ComponentFixture<TrxHistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrxHistComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrxHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
