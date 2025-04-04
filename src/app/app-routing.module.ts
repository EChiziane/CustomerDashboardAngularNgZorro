import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {PaymentComponent} from './payment/payment.component';
import {CustomerDetailsComponent} from './customer/customer-details/customer-details.component';
import {LoginComponent} from './login/login.component';
import {SigninComponent} from './signin/signin.component';
import {ListuserComponent} from './listuser/listuser.component';

const routes: Routes = [
  // Alterar o redirecionamento para 'login' como a rota inicial
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'customer', component: CustomerComponent},
  {path: 'login', component: LoginComponent},
  {path:'register' ,component:SigninComponent},
  {path:'users', component:ListuserComponent},
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
