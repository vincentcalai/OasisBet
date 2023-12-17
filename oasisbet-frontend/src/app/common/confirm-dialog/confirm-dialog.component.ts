import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  dialogTitle: string = '';
  dialogMessage: string = ''; 

  ngOnInit(): void {
    this.dialogTitle = this.data.title;
    this.dialogMessage = this.retrieveDialogMessage(this.data.type);
  }

  constructor(
    public sharedVarService: SharedVarService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }

  retrieveDialogMessage(dialogType: string){
    switch (dialogType) {
      case this.sharedVarService.CREATE_USER_DIALOG_TYPE:
        return this.sharedVarService.CREATE_USER_DIALOG_MSG;
      case this.sharedVarService.CFM_DEPOSIT_DIALOG_TYPE:
        return this.sharedVarService.CFM_DEPOSIT_DIALOG_MSG;
      case this.sharedVarService.CFM_WITHDRAW_DIALOG_TYPE:
        return this.sharedVarService.CFM_WITHDRAW_DIALOG_MSG;
      case this.sharedVarService.CFM_CHANGE_LIMIT_DIALOG_TYPE:
        return this.sharedVarService.CFM_CHANGE_LIMIT_DIALOG_MSG;
      case this.sharedVarService.CFM_UPDATE_PW_DIALOG_TYPE:
        return this.sharedVarService.CFM_UPDATE_PW_DIALOG_MSG;
      default:
        return ''; 
    }
  }

}
