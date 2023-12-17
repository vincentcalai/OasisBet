import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  public updateLoginForm: FormGroup;
  public errorMsg: string;

  constructor(
    public reactiveFormService: ReactiveFormService, 
    public dialog: MatDialog,
    public sharedVar: SharedVarService
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
    console.log("confirm update password.");
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
