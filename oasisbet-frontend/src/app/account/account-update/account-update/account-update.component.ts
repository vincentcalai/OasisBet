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
