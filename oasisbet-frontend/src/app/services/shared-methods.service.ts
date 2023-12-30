import { Injectable } from '@angular/core';
import { SharedVarService } from './shared-var.service';
import { CreateUserModel } from '../model/create-user.model';
import { UserModel } from '../model/user.model';
import { AuthService } from './auth/auth.service';
import { Observable, Subscription, interval, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  public timerSubscription: Subscription;
  
  private loginTime: number;

  constructor(public sharedVar: SharedVarService, public authService: AuthService) { }

  initializeCreateUserModel() {
    this.sharedVar.createUserModel = new CreateUserModel();
    this.sharedVar.createUserModel.user = new UserModel();
  }

  startLoginTimer() {
    this.loginTime = Date.now();
    this.sharedVar.loginTimerSource = interval(1000).subscribe(() => {
      this.sharedVar.loginTimer = this.getLoggedInDuration();
    });
  }

  getLoggedInDuration(): string {
    if (this.authService.isUserLoggedIn()) {
      const durationInSeconds = Math.floor((Date.now() - this.loginTime) / 1000);
      return this.formatDuration(durationInSeconds);
    }
    return '00:00:00';
  }

  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = this.padNumber(hours);
    const formattedMinutes = this.padNumber(minutes);
    const formattedSeconds = this.padNumber(remainingSeconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
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
