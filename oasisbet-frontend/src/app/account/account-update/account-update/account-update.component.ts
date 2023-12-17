import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  public updateLoginForm: FormGroup;
  public errorMsg: string;

  constructor(public reactiveFormService: ReactiveFormService) { }

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
      //Implement dialog for updateLoginForm
    } else{
      console.log("update login form failed!");
      this.reactiveFormService.displayValidationErrors(this.updateLoginForm);
    }
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
