import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-side-nav',
  templateUrl: './account-side-nav.component.html',
  styleUrls: ['./account-side-nav.component.css']
})
export class AccountSideNavComponent implements OnInit {

  @Output() onSelectAccountMenu : EventEmitter<string>;

  constructor(public sharedVar: SharedVarService) { 
    this.onSelectAccountMenu = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  selectAccountMenu(accountMenuSelect: string){
    this.onSelectAccountMenu.emit(accountMenuSelect);
  }

}
