import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OddsLandingComponent } from './odds/odds-landing/odds-landing.component';
import { ResultsLandingComponent } from './results/results-landing/results-landing.component';
import { AccountLandingComponent } from './account/account-landing/account-landing.component';
import { CreateUserComponent } from './account/create-user/create-user.component';

const routes: Routes = [
  { path: 'odds', component: OddsLandingComponent },
  { path: 'results', component: ResultsLandingComponent },
  { path: 'account', component: AccountLandingComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: '**', redirectTo: 'odds', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
