import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.css']
})
export class AccountOverviewComponent implements OnInit {

  accountModelInput: AccountModel;

  constructor(private sharedVar: SharedVarService, private authService: AuthService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.accountModelInput = this.authService.getRetrievedAccDetails();
  }

}
