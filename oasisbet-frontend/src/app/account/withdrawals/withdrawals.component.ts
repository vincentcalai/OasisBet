import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AccountModel } from 'src/app/model/account.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})
export class WithdrawalsComponent implements OnInit {

  public responseMsg: string = '';
  public errorMsg: string = '';
  private subscriptions: Subscription = new Subscription();

  public withdrawalForm: FormGroup;
  public accountModelInput: AccountModel;
  @Output() onSelectTrxMenu: EventEmitter<string>;

  constructor(
      public sharedVar: SharedVarService, 
      private authService: AuthService,
      public reactiveFormService: ReactiveFormService,
      private apiService: ApiService
    ) {
    this.onSelectTrxMenu = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
    this.withdrawalForm = this.reactiveFormService.initializeWithdrawalFormControl();
  }

  navToTrxHistMenu(){
    this.onSelectTrxMenu.emit(this.sharedVar.NAV_MENU_SELECT_TRX_HIST);
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  onCancelWithdrawal(){
    this.withdrawalAmt.setValue(null);
    this.password.setValue(null);
  }

  onConfirmWithdrawal(){
    const username = this.authService.getAuthenticationUser();
    
    if(this.withdrawalForm.valid){
      console.log("withdrawal amount front end validation passed!");
      this.handleJWTAuthLogin(username, this.password.value).subscribe(isLoginSuccess => {
        console.log(isLoginSuccess);
        if(isLoginSuccess){
          const withdrawalAmt: number = parseFloat(this.withdrawalAmt.value);
          let accountModel: AccountModel = new AccountModel();
          accountModel = this.authService.getRetrievedAccDetails();
          accountModel.withdrawalAmt = withdrawalAmt;
          accountModel.actionType = 'W';
          this.sharedVar.updateAccountModel.account = accountModel;
          this.subscriptions.add(
            this.apiService.updateAccDetails().subscribe( (resp: any) => {
              if (resp.statusCode != 0) {
                this.errorMsg = resp.resultMessage;
                resp.resultMessage = "";
              } else {
                this.responseMsg = resp.resultMessage;
                resp.resultMessage = "";
                sessionStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
                this.accountModelInput = this.authService.getRetrievedAccDetails();
              }
            } ,
              error => {
              this.sharedVar.changeException(error);
            })
          );
        } else {
          console.log("show incorrect password msg");
              this.errorMsg = "Incorrect Password. Please enter correct password.";
        }
      });
    } else{
      console.log("withdrawal amount front end validation failed!");
      this.reactiveFormService.displayValidationErrors(this.withdrawalForm);
    }
  }

  handleJWTAuthLogin(username: string, password: string): Observable<boolean> {
    return this.authService.jwtAuthenticate(username, password)
      .pipe(
        map(data => {
          console.log("correct login credentials.");
          console.log(data);
          return true; // Login passed
        }),
        catchError(error => {
          console.log("incorrect login credentials. withdrawal failed.");
          return of(false); // Login failed
        })
      );
  }

  get withdrawalAmt() {
    return this.withdrawalForm.get('withdrawalAmt');
  }

  get password() {
    return this.withdrawalForm.get('password');
  }
}
