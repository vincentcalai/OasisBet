import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpdateComponent } from './account-update.component';
import { SharedVarService } from 'src/app/services/shared-var.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountUpdateComponent', () => {
  let component: AccountUpdateComponent;
  let fixture: ComponentFixture<AccountUpdateComponent>;
  let sharedVarService: SharedVarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountUpdateComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ],
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
