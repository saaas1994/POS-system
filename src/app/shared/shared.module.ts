import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbContextMenuModule, NbListModule, NbLayoutModule, NbTreeGridModule, NbBadgeModule, NbDatepickerModule, NbToggleModule, NbAutocompleteModule, NbCardModule, NbIconModule, NbActionsModule, NbButtonModule, NbCheckboxModule, NbUserModule, NbSelectModule, NbDialogModule, NbRadioModule, NbInputModule, NbMenuModule, NbAlertModule, NbTabsetModule } from '@nebular/theme';
import { TranslateModule } from "@ngx-translate/core";
import { ThemeModule } from 'app/@theme/theme.module';
import { CdkTableModule } from '@angular/cdk/table';
import { MiscellaneousModule } from 'app/pages/miscellaneous/miscellaneous.module';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NbContextMenuModule,
    NbListModule,
    NbLayoutModule,
    NbTreeGridModule,
    // NgxAutocompleteModule,
    NbBadgeModule,
    NbDatepickerModule,
    NbToggleModule,
    NbAutocompleteModule,
    NbCardModule,
    NbIconModule,
    TranslateModule,
    // NbMomentDateModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    ThemeModule,
    ReactiveFormsModule,
    NbContextMenuModule,
    NbListModule,
    NbLayoutModule,
    NbTreeGridModule,
    NbBadgeModule,
    NbDatepickerModule,
    NbToggleModule,
    NbAutocompleteModule,
    ThemeModule,

    // NbMenuModule,
    // MiscellaneousModule,
    NbInputModule,
    // NbCardModule,
    // NbButtonModule,
    // NbActionsModule,
    // NbUserModule,
    // NbCheckboxModule,
    // NbDialogModule,
    // NbRadioModule,
    // NbDatepickerModule,
    NbSelectModule,
    // NbIconModule,
    // CdkTableModule,
    // TranslateModule,
    // NbAlertModule,
    // NbTabsetModule,
    MatFormFieldModule
  ],
})
export class SharedModule {

}
