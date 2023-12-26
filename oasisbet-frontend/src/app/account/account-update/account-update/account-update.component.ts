import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { AccountDetailsModel } from 'src/app/model/account-details.model';
import { AccountModel } from 'src/app/model/account.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();
  public updateAccDetailsForm: FormGroup;
  public updateLoginForm: FormGroup;
  public accountModelInput: AccountModel;

  public accountId: number;
  public responseMsg: string = '';
  public errorMsg: string = '';

  constructor(
    public reactiveFormService: ReactiveFormService,
    public apiService: ApiService,
    public dialog: MatDialog,
    public sharedVar: SharedVarService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();

    if (!this.accountModelInput) {
      this.sharedVar.changeException('Account details are null.');
      throw new Error('Account details are null.');
    }

    this.accountId = this.accountModelInput.accId;

    this.updateAccDetailsForm = this.reactiveFormService.initializeUpdateAccDetailsFormControl();
    this.updateLoginForm = this.reactiveFormService.initializeUpdateLoginFormControl();
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  onCancelUpdate(){
    this.email.setValue(null);
    this.contactNo.setValue(null);
    this.oldPassword.setValue(null);
    this.newPassword.setValue(null);
    this.cfmNewPassword.setValue(null);
  }

  confirmClickedUpdateAccDetails(){
    if(this.updateAccDetailsForm.valid){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '600px',
        data: { type: this.sharedVar.CFM_UPDATE_ACC_DETAILS_DIALOG_TYPE, title: this.sharedVar.CFM_UPDATE_ACC_DETAILS_DIALOG_TITLE }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.onConfirmUpdateAccDetails();
        }
      });
    } else{
      console.log("update login form failed!");
      this.reactiveFormService.displayValidationErrors(this.updateAccDetailsForm);
    }
  }

  confirmClickedUpdateLogin(){
    if(this.updateLoginForm.valid){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: { type: this.sharedVar.CFM_UPDATE_PW_DIALOG_TYPE, title: this.sharedVar.CFM_UPDATE_PW_DIALOG_TITLE }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.onConfirmUpdatePassword();
        }
      });
    } else{
      console.log("update login form failed!");
      this.reactiveFormService.displayValidationErrors(this.updateLoginForm);
    }
  }

  onConfirmUpdateAccDetails() {
    this.errorMsg = "";
    this.responseMsg = "";

    console.log("confirm update account details.");

    const username = this.authService.getAuthenticationUser();

    let accountDetailsModel: AccountDetailsModel = new AccountDetailsModel();
    accountDetailsModel.username = username;
    accountDetailsModel.contactNo = this.contactNo.value;
    accountDetailsModel.email = this.email.value;
    this.sharedVar.updateAccountDetailsModel.accountDetails = accountDetailsModel;

    this.sharedVar.changeSpinner('block');
    this.subscriptions.add(
      this.apiService.updateAccInfo()
      .pipe(finalize(() => this.sharedVar.changeSpinner('none')))
      .subscribe( (resp: any) => {
        if (resp.statusCode != 0) {
          this.errorMsg = resp.resultMessage;
        } else {
          this.responseMsg = resp.resultMessage;
        }
        this.ngOnInit();
      } , error => {
            console.log(error);
            this.authService.handleError(error);
        }
      )
    );

  }

  onConfirmUpdatePassword() {
    this.errorMsg = "";
    this.responseMsg = "";

    console.log("confirm update password.");

    const username = this.authService.getAuthenticationUser();

    let accountDetailsModel: AccountDetailsModel = new AccountDetailsModel();
    accountDetailsModel.username = username;
    accountDetailsModel.oldPassword = this.oldPassword.value;
    accountDetailsModel.newPassword = this.newPassword.value;
    this.sharedVar.updateAccountDetailsModel.accountDetails = accountDetailsModel;

    this.sharedVar.changeSpinner('block');
    this.subscriptions.add(
      this.apiService.updateAccInfo()
      .pipe(finalize(() => this.sharedVar.changeSpinner('none')))
      .subscribe( (resp: any) => {
        if (resp.statusCode != 0) {
          this.errorMsg = resp.resultMessage;
        } else {
          this.responseMsg = resp.resultMessage;
        }
        this.ngOnInit();
      } , error => {
            console.log(error);
            this.authService.handleError(error);
        }
      )
    );
  }

  get email() {
    return this.updateAccDetailsForm.get('email');
  }

  get contactNo() {
    return this.updateAccDetailsForm.get('contactNo');
  }

  get oldPassword() {
    return this.updateLoginForm.get('oldPassword');
  }

  get newPassword() {
    return this.updateLoginForm.get('newPassword');
  }

  get cfmNewPassword() {
    return this.updateLoginForm.get('cfmNewPassword');
  }

}
