import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SupplierFormComponent } from "./supplier-form/supplier-form.component";
import { SupplierListComponent } from "./supplier-list/supplier-list.component";
import { SupplierDetailComponent } from "./supplier-detail/supplier-detail.component";
import { SupplierDashboardComponent } from "./supplier-dashboard/supplier-dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from 'app/shared/shared.module';
import { NbButtonModule } from '@nebular/theme';


const routes: Routes = [
  {
    path: "",
    component: SupplierListComponent,
  },
  {
    path: "supplier-form",
    component: SupplierFormComponent,
  },
  {
    path: "supplier-form/:id",
    component: SupplierFormComponent,
  }
];

@NgModule({
  declarations: [
    SupplierFormComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    SupplierDashboardComponent,

  ],
  imports: [CommonModule, SharedModule, NbButtonModule,
    RouterModule.forChild(routes)],
})
export class SupplierModule { }
