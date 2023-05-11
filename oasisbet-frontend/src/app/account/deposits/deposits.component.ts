import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';
import { SharedVarService } from 'src/app/services/shared-var.service';
@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css']
})
export class DepositsComponent implements OnInit {

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

  onCancelDeposit(){

  }

  onConfirmDeposit(){
    
  }
}
