import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedVarService } from 'src/app/services/shared-var.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'oasisbet-frontend';
  public subscriptions: Subscription = new Subscription();
  public generalErrMsg: String = this.sharedVar.GENERAL_SYS_DOWN_ERR_MSG;
  public errorMsg: String = '';
  public showError: boolean = false;

  constructor(
    private cdref: ChangeDetectorRef,
    public sharedVar: SharedVarService,
    public apiService: ApiService){

  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedVar.currentException
        .subscribe(error => {
          if(error != ''){
            this.showError = true;
            this.errorMsg = this.generalErrMsg + "<br />" + "Error: " + error;
            window.scroll(0, 0);
          } else {
            this.showError = false;
            this.cdref.detectChanges();
          }
      }));
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
