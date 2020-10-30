import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from 'app/shared/shared.module';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";


const routes: Routes = [
  {
    path: "supplier",
    loadChildren: () =>
      import("./supplier/supplier.module").then((m) => m.SupplierModule),
  },
  {
    path: "item",
    loadChildren: () =>
      import("../product-management/item/item.module").then((m) => m.ItemModule),
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule.forChild(routes)
  ],
})
export class PurchaseModule { }
