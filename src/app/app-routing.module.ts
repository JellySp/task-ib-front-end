import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {LoanCalculatorComponent} from './components/loan-calculator/loan-calculator.component';
import {ErrorComponent} from './components/error/error.component';

const routes: Routes = [
  {path: '', component: LandingComponent },
  {path: 'calculator', component: LoanCalculatorComponent },
  {path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
