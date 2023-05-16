import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AccountModel } from 'src/app/model/account.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})
export class WithdrawalsComponent implements OnInit {

  public withdrawalForm: FormGroup;
  public accountModelInput: AccountModel;
  @Output() onSelectTrxMenu: EventEmitter<string>;

  constructor(
      public sharedVar: SharedVarService, 
      private authService: AuthService,
      public reactiveFormService: ReactiveFormService
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
    
  }

  get withdrawalAmt() {
    return this.withdrawalForm.get('withdrawalAmt');
  }

  get password() {
    return this.withdrawalForm.get('password');
  }
}
