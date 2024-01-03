import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TrxHistComponent } from './trx-hist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ACC_DETAILS } from 'src/app/services/auth/auth.service';
import { AccountModel } from 'src/app/model/account.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  it('should populate correct mtd values when retrieve mtd details successfully', () => {
    const mockAccountModel = {"accId": 1000001};
    const accountModel: any = {"mtdBetAmount": "200", "mtdPayout": "50"};
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    spyOn(component.apiService, 'retrieveMtdAmounts').and.returnValue(of({"statusCode":0,"resultMessage": 'Retrieve Successful', "account": accountModel}));
    component.ngOnInit();
    expect(component.apiService.retrieveMtdAmounts).toHaveBeenCalled();
    expect(component.mtdBetAmount).toBe("200");
    expect(component.mtdPayout).toBe("50");
  });

  it('should throw error when retrieve mtd details is unsuccessful', () => {
    const error = new HttpErrorResponse({ error: 'test error', status: 500 });
    const mockAccountModel = {"accId": 1000001};
    const accountModel: any = {"mtdBetAmount": "200", "mtdPayout": "50"};
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    spyOn(component.apiService, 'retrieveMtdAmounts').and.returnValue(throwError(error));
    spyOn(component.sharedVar, 'changeException');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.sharedVar.changeException).toHaveBeenCalledTimes(1);
  });

  it('should get transaction list successfully when retrieve transactions is successful', () => {
    const mockAccountModel = { "accId": 1000001 };
    spyOn(component.authService, 'getRetrievedAccDetails').and.returnValue(mockAccountModel);
    spyOn(component.apiService, 'retrieveTrx').and.returnValue(of([{ "dateTime": new Date(), "desc": 'Chelsea vs Manchester United', "amount": 50 }]));
    component.ngOnInit();
    expect(component.apiService.retrieveTrx).toHaveBeenCalled();
  });

});
