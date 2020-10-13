import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporatesRoutingModule } from './corporates-routing.module';
import { CorporatesListComponent } from './corporates-list/corporates-list.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CorporateEditComponent } from './corporate-edit/corporate-edit.component';



@NgModule({
  declarations: [CorporatesListComponent, CorporateEditComponent],
  imports: [CommonModule, CorporatesRoutingModule, NgxDatatableModule],
})
export class CorporatesModule {}
