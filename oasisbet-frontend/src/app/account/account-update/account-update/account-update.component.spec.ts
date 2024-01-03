import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpdateComponent } from './account-update.component';
import { SharedVarService } from 'src/app/services/shared-var.service';

describe('AccountUpdateComponent', () => {
  let component: AccountUpdateComponent;
  let fixture: ComponentFixture<AccountUpdateComponent>;
  let sharedVarService: SharedVarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountUpdateComponent ],
      providers: [SharedVarService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUpdateComponent);
    component = fixture.componentInstance;
    sharedVarService = TestBed.inject(SharedVarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
