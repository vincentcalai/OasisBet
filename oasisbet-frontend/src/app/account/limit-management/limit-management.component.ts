import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { AccountModel } from 'src/app/model/account.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-limit-management',
  templateUrl: './limit-management.component.html',
  styleUrls: ['./limit-management.component.css']
})
export class LimitManagementComponent implements OnInit {

  errorMsg : string = "";
  responseMsg: string = "";

  public accountModelInput: AccountModel;
  public currentDepositLimit: number;
  public currentBetLimit: number;
  public mtdDepositAmt: number;
  public mtdBetAmt: number;
  public depositProgress: number;
  public betProgress: number;
  private subscriptions: Subscription = new Subscription();

  public limitMgmtForm: FormGroup;

  constructor(public reactiveFormService: ReactiveFormService,
    public sharedVar: SharedVarService, 
    public sharedMethod: SharedMethodsService, 
    public dialog: MatDialog,
    public authService: AuthService,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
    this.currentDepositLimit = this.accountModelInput.depositLimit;
    this.currentBetLimit = this.accountModelInput.betLimit;

    let accId = this.accountModelInput.accId;

    this.subscriptions.add(
      this.apiService.retrieveMtdAmounts(accId).subscribe((resp: any) => {
          this.mtdDepositAmt = resp.account.mtdDepositAmt;
          this.mtdBetAmt = resp.account.mtdBetAmount;
          this.depositProgress = (this.mtdDepositAmt/this.currentDepositLimit) * 100;
          this.betProgress = (this.mtdBetAmt/this.currentBetLimit) * 100;
      } ,
        error => {
        console.log(error);
        this.sharedVar.changeException(error);
      }
      )
    )
    
    this.limitMgmtForm = this.reactiveFormService.initializeLimitMgmtFormControl();
  }

  onChangesDepositLimit(depositLimitSelection: AbstractControl){
    if(depositLimitSelection.value != 'other'){
      this.depositLimit.disable();
      this.depositLimit.setValue(depositLimitSelection.value);
    } else {
      this.depositLimit.enable();
      this.depositLimit.setValue(null);
    }
  }

  onChangesBetLimit(betLimitSelection: AbstractControl){
    if(betLimitSelection.value != 'other'){
      this.betLimit.disable();
      this.betLimit.setValue(betLimitSelection.value);
    } else {
      this.betLimit.enable();
      this.betLimit.setValue(null);
    }
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  onCancelSetLimit(){
    this.depositLimitSelection.setValue(300);
    this.betLimitSelection.setValue(100);
    this.password.setValue(null);
  }

  onConfirmSetLimit(){
    this.errorMsg = "";
    this.responseMsg = "";
    const username = this.authService.getAuthenticationUser();
    this.sharedMethod.handleJWTAuthLogin(username, this.password.value).subscribe(isLoginSuccess => {
      console.log(isLoginSuccess);
        if(isLoginSuccess){
        const depositLimitAmt: number = parseFloat(this.depositLimit.value);
        const betLimitAmt: number = parseFloat(this.betLimit.value);
        let accountModel: AccountModel = new AccountModel();
        accountModel = this.authService.getRetrievedAccDetails();
        accountModel.depositLimit = depositLimitAmt;
        accountModel.betLimit = betLimitAmt;
        accountModel.actionType = 'L';
        this.sharedVar.updateAccountModel.account = accountModel;
        this.subscriptions.add(
          this.apiService.updateAccDetails().subscribe( (resp: any) => {
            if (resp.statusCode != 0) {
              this.errorMsg = resp.resultMessage;
            } else {
              this.responseMsg = resp.resultMessage;
              sessionStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
            }
            this.onCancelSetLimit();
            this.ngOnInit();
          } ,
            error => {
            this.sharedVar.changeException(error);
          })
        );
      } else {
        this.errorMsg = this.sharedVar.INCORRECT_PW_ERR_MSG;
      }
    });
  }

  confirmClicked(){
    if(this.limitMgmtForm.valid){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '600px',
        data: { type: this.sharedVar.CFM_CHANGE_LIMIT_DIALOG_TYPE, title: this.sharedVar.CFM_CHANGE_LIMIT_DIALOG_TITLE }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          console.log("confirm change limit");
          this.onConfirmSetLimit();
        }
      });
    } else{
      console.log("change limit failed!");
      this.reactiveFormService.displayValidationErrors(this.limitMgmtForm);
    }
  }

  get depositLimitSelection() {
    return this.limitMgmtForm.get('depositLimitSelection');
  }

  get betLimitSelection() {
    return this.limitMgmtForm.get('betLimitSelection');
  }

  get password() {
    return this.limitMgmtForm.get('password');
  }

  get depositLimit() {
    return this.limitMgmtForm.get('depositLimit');
  }

  get betLimit() {
    return this.limitMgmtForm.get('betLimit');
  }
}
