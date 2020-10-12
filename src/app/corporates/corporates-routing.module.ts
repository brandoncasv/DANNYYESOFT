import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CorporatesListComponent } from './corporates-list/corporates-list.component';

const routes: Routes = [
  {
    path: '', 
    component: CorporatesListComponent,
    data: {
      title: 'Corporativos'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporatesRoutingModule {}
