import { Injectable } from '@angular/core';
import { SharedVarService } from './shared-var.service';
import { CreateUserModel } from '../model/create-user.model';
import { UserModel } from '../model/user.model';
import { BetsModel } from '../model/bets.model';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor(public sharedVar: SharedVarService) { }

  initializeCreateUserModel() {
    this.sharedVar.createUserModel = new CreateUserModel();
    this.sharedVar.createUserModel.user = new UserModel();
  }
}
