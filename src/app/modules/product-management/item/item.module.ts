import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemComponent } from './item.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonModule } from '@nebular/theme';


const routes: Routes = [
  {
    path: "",
    // component: SupplierListComponent,
  },
  {
    path: "supplier-form",
    component: ItemComponent,
  },
  {
    path: "supplier-form/:id",
    // component: SupplierFormComponent,
  }
];

@NgModule({
  declarations: [
    ItemComponent,

  ],
  imports: [CommonModule, SharedModule, NbButtonModule,
    RouterModule.forChild(routes)],
})
export class ItemModule { }
