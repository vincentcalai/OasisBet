import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})
export class WithdrawalsComponent implements OnInit {

  @Input() accountModelInput: AccountModel;
  @Output() onSelectTrxMenu: EventEmitter<string>;

  constructor(public sharedVar: SharedVarService) {
    this.onSelectTrxMenu = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  navToTrxHistMenu(){
    this.onSelectTrxMenu.emit(this.sharedVar.NAV_MENU_SELECT_TRX_HIST);
  }

  onCancelWithdrawal(){

  }

  onConfirmWithdrawal(){
    
  }
}
