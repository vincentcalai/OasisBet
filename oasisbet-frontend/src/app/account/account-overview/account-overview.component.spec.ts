import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOverviewComponent } from './account-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ACC_DETAILS } from 'src/app/services/auth/auth.service';
import { AccountModel } from 'src/app/model/account.model';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    let accountModel = new AccountModel();
    accountModel.accId = 1;
    sessionStorage.setItem(ACC_DETAILS, JSON.stringify(accountModel));
    expect(component).toBeTruthy();
  });
});
