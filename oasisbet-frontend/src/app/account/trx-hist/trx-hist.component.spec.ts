import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxHistComponent } from './trx-hist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ACC_DETAILS } from 'src/app/services/auth/auth.service';
import { AccountModel } from 'src/app/model/account.model';

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
    let account = new AccountModel;
    account.accId = 1;
    sessionStorage.setItem(ACC_DETAILS, JSON.stringify(account));
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.removeItem(ACC_DETAILS);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
