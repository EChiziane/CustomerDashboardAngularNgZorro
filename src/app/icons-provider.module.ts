import {NgModule} from '@angular/core';
import {NzIconModule, provideNzIcons} from 'ng-zorro-antd/icon';

import {DashboardOutline, FormOutline, MenuFoldOutline, MenuUnfoldOutline} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    provideNzIcons(icons)
  ]
})
export class IconsProviderModule {
}
