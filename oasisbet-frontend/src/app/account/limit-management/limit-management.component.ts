import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';

@Component({
  selector: 'app-limit-management',
  templateUrl: './limit-management.component.html',
  styleUrls: ['./limit-management.component.css']
})
export class LimitManagementComponent implements OnInit {

  errorMsg : string = "";
  responseMsg: string = "";

  public limitMgmtForm: FormGroup;

  constructor(public reactiveFormService: ReactiveFormService, 
    public sharedMethod: SharedMethodsService, 
    public authService: AuthService) { }

  ngOnInit(): void {
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
    if(this.limitMgmtForm.valid){
      console.log("limit management form front end validation passed!");
      this.sharedMethod.handleJWTAuthLogin(username, this.password.value).subscribe(isLoginSuccess => {
        console.log(isLoginSuccess);
         if(isLoginSuccess){
        //   const withdrawalAmt: number = parseFloat(this.withdrawalAmt.value);
        //   let accountModel: AccountModel = new AccountModel();
        //   accountModel = this.authService.getRetrievedAccDetails();
        //   accountModel.withdrawalAmt = withdrawalAmt;
        //   accountModel.actionType = 'W';
        //   this.sharedVar.updateAccountModel.account = accountModel;
        //   this.subscriptions.add(
        //     this.apiService.updateAccDetails().subscribe( (resp: any) => {
        //       if (resp.statusCode != 0) {
        //         this.errorMsg = resp.resultMessage;
        //       } else {
        //         this.responseMsg = resp.resultMessage;
        //         sessionStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
        //         this.accountModelInput = this.authService.getRetrievedAccDetails();
        //       }
        //     } ,
        //       error => {
        //       this.sharedVar.changeException(error);
        //     })
        //   );
        } else {
          console.log("show incorrect password msg");
              this.errorMsg = "Incorrect Password. Please enter correct password.";
        }
      });
    } else{
      console.log("limit management form front end validation failed!");
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
