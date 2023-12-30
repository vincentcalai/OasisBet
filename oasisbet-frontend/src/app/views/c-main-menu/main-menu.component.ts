import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedMethodsService } from 'src/app/services/shared-methods.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public spinme: string = 'none';

  public subscriptions: Subscription = new Subscription();

  constructor(public authService: AuthService,
    public sharedVar: SharedVarService,
    public sharedMethods: SharedMethodsService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedVar.currentSpinner.subscribe(status => this.spinme = status)
    );
  }

  logout(): void {
    this.authService.logout();
    this.sharedMethods.stopLoginTimer()
  }
}
