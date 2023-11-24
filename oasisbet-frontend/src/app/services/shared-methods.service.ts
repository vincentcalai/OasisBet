import { Injectable } from '@angular/core';
import { SharedVarService } from './shared-var.service';
import { CreateUserModel } from '../model/create-user.model';
import { UserModel } from '../model/user.model';
import { AuthService } from './auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginCredentialsModel } from '../model/login-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor(public sharedVar: SharedVarService, public authService: AuthService) { }

  initializeCreateUserModel() {
    this.sharedVar.createUserModel = new CreateUserModel();
    this.sharedVar.createUserModel.user = new UserModel();
  }

  handleJWTAuthLogin(): Observable<boolean> {
    return this.authService.jwtAuthenticate()
      .pipe(
        map(data => {
          console.log("correct login credentials.");
          console.log(data);
          return true; // Login passed
        }),
        catchError(error => {
          console.log("incorrect login credentials. withdrawal failed.");
          return of(false); // Login failed
        })
      );
  }
}
