import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, of } from 'rxjs';
import { map, catchError, take, finalize } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { AccountModel } from 'src/app/model/account.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';
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
      public authService: AuthService,
      public reactiveFormService: ReactiveFormService,
      public dialog: MatDialog,
      public sharedMethod: SharedMethodsService,
      public apiService: ApiService
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
    this.errorMsg = "";
    this.responseMsg = "";
    const username = this.authService.getAuthenticationUser();

    this.sharedVar.loginCredentialsModel.username = username;
    this.sharedVar.loginCredentialsModel.password = this.password.value;

    this.sharedMethod.handleJWTAuthLogin().subscribe(isLoginSuccess => {
      if(isLoginSuccess){
        const withdrawalAmt: number = parseFloat(this.withdrawalAmt.value);
        let accountModel: AccountModel = new AccountModel();
        accountModel = this.authService.getRetrievedAccDetails();
        accountModel.withdrawalAmt = withdrawalAmt;
        accountModel.actionType = 'W';
        this.sharedVar.updateAccountModel.account = accountModel;
        this.sharedVar.changeSpinner('block');
        this.subscriptions.add(
          this.apiService.updateAccDetails()
          .pipe(take(1), finalize(() => this.sharedVar.changeSpinner('none')))
          .subscribe( (resp: any) => {
            if (resp.statusCode != 0) {
              this.errorMsg = resp.resultMessage;
            } else {
              this.responseMsg = resp.resultMessage;
              localStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
              this.accountModelInput = this.authService.getRetrievedAccDetails();
              this.ngOnInit();
            }
          } ,
            error => {
            this.sharedVar.changeSpinner('none');
            console.log(error);
            this.authService.handleError(error);
          })
        );
      } else {
        console.log("show incorrect password msg");
            this.errorMsg = this.sharedVar.INCORRECT_PW_ERR_MSG;
      }
    });
  }

  confirmClicked(){
    if(this.withdrawalForm.valid){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: { type: this.sharedVar.CFM_WITHDRAW_DIALOG_TYPE, title: this.sharedVar.CFM_WITHDRAW_DIALOG_TITLE }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          console.log("confirm withdrawal");
          this.onConfirmWithdrawal();
        }
      });
    } else{
      console.log("withdrawal amount failed!");
      this.reactiveFormService.displayValidationErrors(this.withdrawalForm);
    }
  }

  get withdrawalAmt() {
    return this.withdrawalForm.get('withdrawalAmt');
  }

  get password() {
    return this.withdrawalForm.get('password');
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
