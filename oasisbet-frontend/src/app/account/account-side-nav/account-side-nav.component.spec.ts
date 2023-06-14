import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSideNavComponent } from './account-side-nav.component';

describe('AccountSideNavComponent', () => {
  let component: AccountSideNavComponent;
  let fixture: ComponentFixture<AccountSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when select menu, should emit the correct menu', () => {
    const accountMenuSelect = component.sharedVar.NAV_MENU_SELECT_ACCOUNT_OVERVIEW;
    let emittedMenuSelect: string;

    component.onSelectAccountMenu.subscribe((menuSelect: string) => {
      emittedMenuSelect = menuSelect;
    });

    component.selectAccountMenu(accountMenuSelect);

    expect(emittedMenuSelect).toBe(accountMenuSelect);
  });
});
