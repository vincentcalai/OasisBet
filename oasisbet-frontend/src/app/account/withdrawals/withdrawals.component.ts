import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})
export class WithdrawalsComponent implements OnInit {

  accountModelInput: AccountModel;
  @Output() onSelectTrxMenu: EventEmitter<string>;

  constructor(public sharedVar: SharedVarService, private authService: AuthService) {
    this.onSelectTrxMenu = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
  }

  navToTrxHistMenu(){
    this.onSelectTrxMenu.emit(this.sharedVar.NAV_MENU_SELECT_TRX_HIST);
  }

  onCancelWithdrawal(){

  }

  onConfirmWithdrawal(){
    
  }
}
