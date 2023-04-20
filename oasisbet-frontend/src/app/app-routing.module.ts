import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OddsLandingComponent } from './odds/odds-landing/odds-landing.component';

const routes: Routes = [
  { path: '', component: OddsLandingComponent },
  { path: 'odds', component: OddsLandingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
