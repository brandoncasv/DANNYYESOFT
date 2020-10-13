import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CorporatesListComponent } from './corporates-list/corporates-list.component';
import { CorporateEditComponent } from "./corporate-edit/corporate-edit.component";

const routes: Routes = [
  {
    path: "",
    component: CorporatesListComponent,
    data: {
      title: "Corporativos",
    },
  },
  {
    path: "detalles/:id",
    component: CorporateEditComponent,
    data: {
      title: "Detalles",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporatesRoutingModule {}
