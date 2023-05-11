import { Component, Input, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {

  @Input() accountModelInput: AccountModel;

  constructor() { }

  ngOnInit(): void {
  }



}
