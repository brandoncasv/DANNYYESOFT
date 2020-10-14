import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CorporatesService } from '../_services/corporates.service';
import { CorporateI, ResponseCorporateI } from '../_models/corporate.interface';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-corporate-edit",
  templateUrl: "./corporate-edit.component.html",
  styleUrls: [
    "./corporate-edit.component.scss",
    "/assets/sass/pages/page-users.scss",
    "/assets/sass/libs/select.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CorporateEditComponent implements OnInit {
  public corporate$: Observable<CorporateI>;
  public formValidator: boolean = false;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.emailPattern),
      ]),
      name: new FormControl("", [Validators.required, Validators.minLength(5)]),
      message: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
    });
  }
  contactForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private corporateSvc: CorporatesService,
    private spinner: NgxSpinnerService
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
    const idCorporate = this.route.snapshot.params.id;
    console.log("ID de la corporacion: " + idCorporate);
    this.corporate$ = this.corporateSvc.getCorporate(idCorporate);
  }

  onResetForm() {
    this.contactForm.reset();
  }

  stateForm() {
    if (!this.formValidator) {
      this.formValidator = true;
    } else {
      this.formValidator = false;
    }
  }

  goToCorporates() {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigateByUrl("/corporativos");
      this.spinner.hide();
    }, 1000);
  }
}
