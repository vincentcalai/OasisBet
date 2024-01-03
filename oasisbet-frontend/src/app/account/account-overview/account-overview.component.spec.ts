import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOverviewComponent } from './account-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ACC_DETAILS } from 'src/app/services/auth/auth.service';
import { AccountModel } from 'src/app/model/account.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AccountOverviewComponent', () => {
  let component: AccountOverviewComponent;
  let fixture: ComponentFixture<AccountOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOverviewComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOverviewComponent);
    component = fixture.componentInstance;
    let accountModel = new AccountModel();
    accountModel.accId = 1;
    sessionStorage.setItem(ACC_DETAILS, JSON.stringify(accountModel));
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.removeItem(ACC_DETAILS);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when retrieve account details, should return correct value', () => {
    const accountModel: any = {};
    accountModel.ytdDepositAmt = 500.00;
    accountModel.ytdWithdrawalAmt = 300.00;
    spyOn(component.apiService, 'retrieveYtdAmounts').and.returnValue(of({"statusCode":0,"resultMessage": 'Login Successful', "account": accountModel}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ytdDepositAmt).toBe(500.00);
    expect(component.ytdWithdrawalAmt).toBe(300.00);
  });

  it('when fail to retrieve account details due to error, should throw error exception', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    spyOn(component.apiService, 'retrieveYtdAmounts').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.sharedVar.changeException).toHaveBeenCalledTimes(1);
  });
});
