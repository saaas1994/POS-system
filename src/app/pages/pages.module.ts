import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from 'app/@guards/auth.guard';
import { LoginComponent } from 'app/login/login.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  providers: [AuthGuard],
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [
    PagesComponent,
    LoginComponent
  ],
})
export class PagesModule {
}
