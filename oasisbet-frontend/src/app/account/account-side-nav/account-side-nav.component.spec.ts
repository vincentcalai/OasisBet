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
});
