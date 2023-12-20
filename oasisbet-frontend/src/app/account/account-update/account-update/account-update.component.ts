import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { AccountPwModel } from 'src/app/model/account-pw.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  public subscriptions: Subscription = new Subscription();
  public updateLoginForm: FormGroup;
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
    this.updateLoginForm = this.reactiveFormService.initializeUpdateLoginFormControl();
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  onCancelUpdate(){
    this.oldPassword.setValue(null);
    this.newPassword.setValue(null);
    this.cfmNewPassword.setValue(null);
  }

  confirmClicked(){
    if(this.updateLoginForm.valid){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: { type: this.sharedVar.CFM_UPDATE_PW_DIALOG_TYPE, title: this.sharedVar.CFM_UPDATE_PW_DIALOG_TITLE }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          console.log("confirm update password");
          this.onConfirmUpdate();
        }
      });
    } else{
      console.log("update login form failed!");
      this.reactiveFormService.displayValidationErrors(this.updateLoginForm);
    }
  }

  onConfirmUpdate() {
    this.errorMsg = "";
    this.responseMsg = "";

    console.log("confirm update password.");

    const username = this.authService.getAuthenticationUser();

    let accountPwModel: AccountPwModel = new AccountPwModel();
    accountPwModel.username = username;
    accountPwModel.oldPassword = this.oldPassword.value;
    accountPwModel.newPassword = this.newPassword.value;
    this.sharedVar.updateAccountPwModel.accountPw = accountPwModel;

    this.sharedVar.changeSpinner('block');
    this.subscriptions.add(
      this.apiService.updateAccPassword()
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
