import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLandingComponent } from './account-landing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountLandingComponent', () => {
  let component: AccountLandingComponent;
  let fixture: ComponentFixture<AccountLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountLandingComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when select transaction history menu, account navigation menu should show transaction history', () => {
    const expectedMenu = component.sharedVar.NAV_MENU_SELECT_TRX_HIST;
    component.navToAccountMenu(expectedMenu);
    expect(component.selectAccountNavMenu).toBe(expectedMenu);
  });
});
