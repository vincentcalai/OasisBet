import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';

@Component({
  selector: 'app-limit-management',
  templateUrl: './limit-management.component.html',
  styleUrls: ['./limit-management.component.css']
})
export class LimitManagementComponent implements OnInit {

  errorMsg : string = "";
  responseMsg: string = "";
  public limitMgmtForm: FormGroup;

  constructor(public reactiveFormService: ReactiveFormService) { }

  ngOnInit(): void {
    this.limitMgmtForm = this.reactiveFormService.initializeLimitMgmtFormControl();
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  onCancelSetLimit(){
    this.depositLimit.setValue(null);
    this.betLimit.setValue(null);
    this.password.setValue(null);
  }

  onConfirmSetLimit(){
    this.errorMsg = "";
    this.responseMsg = "";
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
