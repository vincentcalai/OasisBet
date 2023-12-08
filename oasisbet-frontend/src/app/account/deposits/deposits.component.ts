import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, finalize } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { AccountModel } from 'src/app/model/account.model';
import { ApiService } from 'src/app/services/api/api.service';
import { ACC_DETAILS, AUTHORIZATION, AUTH_USER, AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';
import { SharedVarService } from 'src/app/services/shared-var.service';
@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

  public responseMsg: string = '';
  public errorMsg: string = '';
  private subscriptions: Subscription = new Subscription();

  public depositRemLimit: number;
  public mtdDepositAmt: number;
  public depositControl: FormControl;
  public accountModelInput: AccountModel;
  @Output() onSelectTrxMenu: EventEmitter<string>;

  constructor(
    public sharedVar: SharedVarService,
    public dialog: MatDialog,
    public reactiveFormService: ReactiveFormService,
    public authService: AuthService,
    public apiService: ApiService,
    public router: Router)
  {
    this.onSelectTrxMenu = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
    this.depositControl = this.reactiveFormService.initializeDepositFormControl();

    const accId = this.accountModelInput.accId;
    this.subscriptions.add(
      this.apiService.retrieveMtdAmounts(accId).subscribe((resp: any) => {
            this.mtdDepositAmt = resp.account.mtdDepositAmt;
            this.depositRemLimit = this.accountModelInput.depositLimit - this.mtdDepositAmt;
        } ,
          error => {
            console.log(error);
            this.authService.handleError(error);
        }
       )
    )
  }

  navToTrxHistMenu(){
    this.onSelectTrxMenu.emit(this.sharedVar.NAV_MENU_SELECT_TRX_HIST);
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return this.reactiveFormService.fieldIsInvalid(field);
  }

  clearDeposit(){
    this.depositControl.setValue(null);
    this.depositControl.setErrors(null);
    this.depositControl.markAsPristine();
  }

  onConfirmDeposit(){
      this.errorMsg = "";
      this.responseMsg = "";
      console.log("deposit amount success!");
      const depositAmount: number = parseFloat(this.depositControl.value);
      this.accountModelInput.depositAmt = depositAmount;
      this.accountModelInput.actionType = 'D';
      this.sharedVar.updateAccountModel.account = this.accountModelInput;
      this.sharedVar.changeSpinner('block');
      this.subscriptions.add(
        this.apiService.updateAccDetails()
        .pipe(take(1), finalize(() => this.sharedVar.changeSpinner('none')))
        .subscribe( (resp: any) => {
          if (resp.statusCode != 0) {
            this.errorMsg = resp.resultMessage;
          } else {
            this.responseMsg = resp.resultMessage;
            sessionStorage.setItem(ACC_DETAILS, JSON.stringify(resp.account));
            this.ngOnInit();
          }
        } ,
          error => {
          this.sharedVar.changeSpinner('none');
          this.sharedVar.changeException(error);
        })
      );
  }

  confirmClicked(){
    if(this.depositControl.valid){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: { type: this.sharedVar.CFM_DEPOSIT_DIALOG_TYPE, title: this.sharedVar.CFM_DEPOSIT_DIALOG_TITLE }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          console.log("confirm deposit");
          this.onConfirmDeposit();
        }
      });
    } else{
      console.log("deposit amount failed!");
      this.reactiveFormService.displayValidationErrors(this.depositControl);
    }
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
