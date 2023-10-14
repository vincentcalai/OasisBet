import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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

    this.depositLimit.setValue(300);
    this.betLimit.setValue(100);
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
    this.depositLimit.setValue(null);
    this.betLimit.setValue(null);
    this.password.setValue(null);
  }

  onConfirmSetLimit(){
    console.log(this.depositLimit.value);
    console.log(this.betLimit.value);
    this.errorMsg = "";
    this.responseMsg = "";
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
