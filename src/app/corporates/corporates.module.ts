import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporatesRoutingModule } from './corporates-routing.module';
import { CorporatesListComponent } from './corporates-list/corporates-list.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CorporateEditComponent } from './corporate-edit/corporate-edit.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [CorporatesListComponent, CorporateEditComponent],
  imports: [
    CommonModule,
    CorporatesRoutingModule,
    NgxDatatableModule,
    NgbModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CorporatesModule {}
