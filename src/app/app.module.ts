import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import {CustomerComponent} from './customer/customer.component';
import {NzAutosizeDirective, NzInputDirective, NzInputGroupComponent, NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {NzDatePickerComponent, NzDatePickerModule, NzRangePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzFilterTriggerComponent, NzTableModule, NzThAddOnComponent} from 'ng-zorro-antd/table';

import {NzDrawerComponent, NzDrawerContentDirective, NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzSelectComponent, NzSelectModule} from 'ng-zorro-antd/select';
import {NzFormDirective, NzFormModule} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {PaymentComponent} from './payment/payment.component';
import {NzSwitchComponent, NzSwitchModule} from 'ng-zorro-antd/switch';
import {CustomerDetailsComponent} from './customer/customer-details/customer-details.component';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {LoginComponent} from './login/login.component';
import {NzAlertComponent} from 'ng-zorro-antd/alert';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';

import {ListuserComponent} from './listuser/listuser.component';
import {SigninComponent} from './signin/signin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NzStatisticComponent} from 'ng-zorro-antd/statistic';
import {PaymentDetailsComponent} from './payment/payment-details/payment-details.component';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {
  NzPageHeaderComponent,
  NzPageHeaderContentDirective,
  NzPageHeaderExtraDirective,
  NzPageHeaderSubtitleDirective, NzPageHeaderTitleDirective
} from 'ng-zorro-antd/page-header';
import {NzSpaceComponent, NzSpaceItemDirective} from 'ng-zorro-antd/space';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    LoginComponent,
    MainLayoutComponent,
  SigninComponent,
    ListuserComponent,
    DashboardComponent,
    PaymentDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    HttpClientModule,
    NzLayoutModule,
    NzDropDownModule,
    NzMenuModule,
    FormsModule,
    NzInputDirective,
    NzButtonComponent,
    NzDividerComponent,
    NzTableModule,

    NzFilterTriggerComponent,
    NzThAddOnComponent,
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzDrawerComponent,
    NzFormDirective,
    NzInputGroupComponent,
    NzSelectComponent,
    NzRangePickerComponent,
    NzAutosizeDirective,
    NzDrawerContentDirective,
    NzDatePickerComponent,
    NzButtonModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzSwitchComponent,
    NzTagComponent,
    NzAlertComponent,
    NzCheckboxComponent,
    NzModalModule,
    NzAvatarModule,
    NzSwitchModule,
    NzStatisticComponent,
    NzDescriptionsItemComponent,
    NzDescriptionsComponent,
    NzPageHeaderContentDirective,
    NzSpaceComponent,
    NzPageHeaderExtraDirective,
    NzPageHeaderSubtitleDirective,
    NzPageHeaderTitleDirective,
    NzPageHeaderComponent,
    NzSpaceItemDirective

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideClientHydration(withEventReplay()),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
