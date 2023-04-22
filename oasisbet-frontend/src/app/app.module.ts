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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


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
    AccountSideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
