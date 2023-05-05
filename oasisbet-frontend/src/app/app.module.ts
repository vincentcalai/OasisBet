import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/a-main/app.component';
import { HeaderComponent } from './views/b-header/header.component';
import { MainMenuComponent } from './views/c-main-menu/main-menu.component';
import { OddsLandingComponent } from './odds/odds-landing/odds-landing.component';
import { ResultsLandingComponent } from './results/results-landing/results-landing.component';
import { AccountLandingComponent } from './account/account-landing/account-landing.component';
import { OddsSideNavComponent } from './odds/odds-side-nav/odds-side-nav.component';
import { ResultsSideNavComponent } from './results/results-side-nav/results-side-nav.component';
import { AccountSideNavComponent } from './account/account-side-nav/account-side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { CreateUserComponent } from './account/create-user/create-user.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    OddsLandingComponent,
    ResultsLandingComponent,
    AccountLandingComponent,
    OddsSideNavComponent,
    ResultsSideNavComponent,
    AccountSideNavComponent,
    AccountLoginComponent,
    CreateUserComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
