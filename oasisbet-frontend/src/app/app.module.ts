import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/a-main/app.component';
import { HeaderComponent } from './views/b-header/header.component';
import { MainMenuComponent } from './views/c-main-menu/main-menu.component';
import { OddsLandingComponent } from './odds/odds-landing/odds-landing.component';
import { ResultsLandingComponent } from './results/results-landing/results-landing.component';
import { AccountLandingComponent } from './account/account-landing/account-landing.component';
import { AccountSideNavComponent } from './account/account-side-nav/account-side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { CreateUserComponent } from './account/create-user/create-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { AccountOverviewComponent } from './account/account-overview/account-overview.component';
import { TrxHistComponent } from './account/trx-hist/trx-hist.component';
import { DepositsComponent } from './account/deposits/deposits.component';
import { WithdrawalsComponent } from './account/withdrawals/withdrawals.component';
import { OddsBetSlipComponent } from './odds/odds-bet-slip/odds-bet-slip.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LimitManagementComponent } from './account/limit-management/limit-management.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { InterceptorModule } from './services/api/interceptor.module';
import {MatTabsModule} from '@angular/material/tabs';
import { CompSideNavComponent } from './views/d-comp-side-nav/comp-side-nav.component';
import { AccountUpdateComponent } from './account/account-update/account-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    OddsLandingComponent,
    ResultsLandingComponent,
    AccountLandingComponent,
    AccountSideNavComponent,
    AccountLoginComponent,
    CreateUserComponent,
    ConfirmDialogComponent,
    AccountOverviewComponent,
    TrxHistComponent,
    DepositsComponent,
    WithdrawalsComponent,
    OddsBetSlipComponent,
    LimitManagementComponent,
    CompSideNavComponent,
    AccountUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InterceptorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule,
    ModalModule.forRoot()
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
