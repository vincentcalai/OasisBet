import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OddsLandingComponent } from './odds/odds-landing/odds-landing.component';
import { ResultsLandingComponent } from './results/results-landing/results-landing.component';
import { AccountLandingComponent } from './account/account-landing/account-landing.component';

const routes: Routes = [
  { path: '', component: OddsLandingComponent },
  { path: 'odds', component: OddsLandingComponent },
  { path: 'results', component: ResultsLandingComponent },
  { path: 'account', component: AccountLandingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
