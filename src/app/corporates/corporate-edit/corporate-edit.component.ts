import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CorporatesService } from '../_services/corporates.service';
import { CorporateI, PutCorporateI, ContactosI } from '../_models/corporate.interface';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";


@Component({
  selector: "app-corporate-edit",
  templateUrl: "./corporate-edit.component.html",
  styleUrls: [
    "./corporate-edit.component.scss",
    "/assets/sass/pages/page-users.scss",
    "/assets/sass/libs/select.scss",
    "/assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CorporateEditComponent implements OnInit {
  public corporate$: Observable<CorporateI>;
  public formValidator: boolean = false;
  public corporateArray: Promise<CorporateI>;
  public vCreateUpdate: boolean = false;
  private idCorporate: string;
  private idContact: number;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows: ContactosI;
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [
    { name: "NOMBRE", prop: "NOMBRE" },
    { name: "PUESTO", prop: "PUESTO" },
    { name: "TELÉFONO", prop: "TELÉFONO" },
    { name: "CELULAR", prop: "CELULAR" },
    { name: "EMAIL", prop: "EMAIL" },
    { name: "OBSERVACIONES", prop: "OBSERVACIONES" },
    { name: "ACCIONES", prop: "ACCIONES" },
  ];
  //
  public contactNew;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private corporateSvc: CorporatesService,
    private spinner: NgxSpinnerService
  ) {
    //assing the id from the url to idCorporate
    this.idCorporate = this.route.snapshot.params.id;
  }

  ngOnInit() {
    console.log(this.contactNew);
    this.loadData();
  }

  async loadData() {
    this.corporateArray = this.corporateSvc.getCorporatePromise(
      this.idCorporate
    );
    this.rows = await this.corporateArray.then((res) => {
      return res.tw_contactos_corporativo;
    });
    this.contactNew = {
      S_Nombre: "",
      S_Puesto: "",
      S_Comentarios: "",
      N_TelefonoFijo: null,
      N_TelefonoMovil: null,
      S_Email: "",
      tw_corporativo_id: this.rows[0]["tw_corporativo_id"],
    };
  }

  createOrUpdate() {
    if (!this.vCreateUpdate) {
      console.log("Crear contacto:", this.contactNew);
      this.corporateSvc.createContact(this.contactNew);
      this.loadData();
    } else {
      console.log("Actualizar contacto:", this.contactNew);
      this.corporateSvc.updateContact(this.idContact, this.contactNew);
      this.loadData();
    }
  }
  deleteContact(id) {
    //console.log(id);
    this.corporateSvc.deleteContact(id);
    this.loadData();
  }
  selecContact(data: ContactosI) {
    this.idContact = data.id;
    this.contactNew = {
      S_Nombre: data.S_Nombre,
      S_Puesto: data.S_Puesto,
      S_Comentarios: data.S_Comentarios,
      N_TelefonoFijo: data.N_TelefonoFijo,
      N_TelefonoMovil: data.N_TelefonoMovil,
      S_Email: data.S_Email,
      tw_corporativo_id: data.tw_corporativo_id,
    };
    console.log(this.contactNew);
    console.log(data);
    this.vCreateUpdate = true;
  }

  async onSaveForm() {
    if (!this.formValidator) {
      this.formValidator = true;
      console.log("Esperando cambios");
    } else {
      this.formValidator = false;
      let data: PutCorporateI = await this.collectData().then((res) => {
        return res;
      });
      //console.log(data);
      this.corporateSvc
        .putCorporate(data, this.idCorporate)
        .subscribe((res) => {
          //console.log(res);
          console.log("Cambios Hechos");
        });
    }
  }

  goToCorporates() {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigateByUrl("/corporativos");
      this.spinner.hide();
    }, 1000);
  }

  collectData() {
    let newData;
    return this.corporateArray
      .then((data) => {
        //let fecheIncorporacion = new Date(data.D_FechaIncorporacion.toDateString(), "YYYY MM DD hh:mm:ss" );
        //let inc = new Date("2020-09-22 00:00:00");
        newData = {
          FK_Asignado_id: data.FK_Asignado_id,
          D_FechaIncorporacion: data.D_FechaIncorporacion,
          S_Activo: data.S_Activo,
          S_LogoURL: data.S_LogoURL,
          S_NombreCompleto: data.S_NombreCompleto,
          S_NombreCorto: data.S_NombreCorto,
          id: data.id,
        };
        //console.log(data.D_FechaIncorporacion);
        return newData;
      })
      .catch();
  }
}
