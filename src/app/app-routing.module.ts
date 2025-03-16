import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {PaymentComponent} from './payment/payment.component';
import {CustomerDetailsComponent} from './customer/customer-details/customer-details.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'customer', component: CustomerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'customer-detail/:id', component: CustomerDetailsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
