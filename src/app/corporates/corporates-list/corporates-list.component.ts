import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { CorporatesService } from "../_services/corporates.service";
import { CorporatesI } from "../_models/corporates.interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-corporates-list",
  templateUrl: "./corporates-list.component.html",
  styleUrls: [
    "./corporates-list.component.scss",
    "/assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CorporatesListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows: CorporatesI[] = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [
    { name: "LOGO", prop: "LOGO" },
    { name: "URL", prop: "URL" },
    { name: "INCORPORACIÓN", prop: "INCORPORACIÓN" },
    { name: "CREADO EL", prop: "CREADO EL" },
    { name: "ASIGNADO A", prop: "ASIGNADO A" },
    { name: "STATUS", prop: "STATUS" },
    { name: "ACCIONES", prop: "ACCIONES" },
  ];

  // private
  private tempData = [];
  constructor(private corporatesSvc: CorporatesService) {
    //this.tempData = usersListData;
    console.log("Corporaciones");
    this.corporatesSvc.getCorporates().subscribe((res) => {
      this.rows = res;      
    });
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {}
}
