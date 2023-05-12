import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from 'src/app/model/account.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';
import { SharedVarService } from 'src/app/services/shared-var.service';
@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  depositAmt: FormControl;
  accountModelInput: AccountModel;
  @Output() onSelectTrxMenu: EventEmitter<string>;
  
  constructor(private sharedVar: SharedVarService, private sharedMethods: SharedMethodsService, public reactiveFormService: ReactiveFormService, private authService: AuthService) { 
    this.onSelectTrxMenu = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
    console.log(this.depositAmt);
    this.depositAmt = new FormControl(null, 
      {validators: [
        Validators.required, 
        Validators.pattern(/^\d{1,9}(\.\d{1,2})?$/),
        Validators.max(199999.99)],
       updateOn: 'blur'
      }
    );
  }

  navToTrxHistMenu(){
    this.onSelectTrxMenu.emit(this.sharedVar.NAV_MENU_SELECT_TRX_HIST);
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  onCancelDeposit(){

  }

  onConfirmDeposit(){
    
  }
}
