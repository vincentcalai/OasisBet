import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoginComponent } from './account-login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedVarService } from 'src/app/services/shared-var.service';
import { BehaviorSubject, of } from 'rxjs';

describe('AccountLoginComponent', () => {
  let component: AccountLoginComponent;
  let fixture: ComponentFixture<AccountLoginComponent>;
  let sharedVarService: SharedVarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountLoginComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [SharedVarService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoginComponent);
    component = fixture.componentInstance;
    sharedVarService = TestBed.inject(SharedVarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should subscribe to showUserNotLoginSource and update errorMsg', () => {
    const errorMsg = 'Credential Failed';
    component.sharedVar.changeShowUserNotLoginMsg('Credential Failed');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.errorMsg).toBe(errorMsg);
  });

  it('ngOnInit should subscribe to responseSource and update responseMsg', () => {
    const mockResponse = { statusCode: 0, resultMessage: 'Login Success' };
    component.sharedVar.changeResponse(mockResponse);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.responseMsg).toBe('Login Success');
  });
});
