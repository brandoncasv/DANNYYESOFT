import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.dev";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CorporatesI, ResponseCorporatesI } from '../_models/corporates.interface'
import { ResponseCorporateI, CorporateI, PutCorporateI, PostContactoI } from "../_models/corporate.interface";

@Injectable({
  providedIn: "root",
})
export class CorporatesService {
  public apiCorporates = environment.apiURL + "/corporativos";
  public apiCorporate = environment.apiURL + "/corporativos/";
  public apiContact = environment.apiURL + "/contactos";
  public apiDeleteContact = environment.apiURL + "/contactos/";

  public auth_token = "Bearer " + localStorage.getItem("tokenscloud");
  options: any;

  constructor(private http: HttpClient) {}

  header: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.auth_token,
  });

  getCorporates(): Observable<CorporatesI[]> {
    return this.http
      .get<ResponseCorporatesI>(this.apiCorporates, { headers: this.header })
      .pipe(
        map((res: ResponseCorporatesI) => {
          //console.log(res);
          return res.data;
        })
      );
  }

  getCorporate(id): Observable<CorporateI> {
    let res: Observable<CorporateI>;
    res = this.http
      .get<ResponseCorporateI>(`${this.apiCorporate}${id}`, {
        headers: this.header,
      })
      .pipe(
        map((res: ResponseCorporateI) => {
          //console.log(res);
          return res.data.corporativo;
        })
      );
    return res;
  }

  async getCorporatePromise(id): Promise<CorporateI> {
    const promise = await this.http
      .get<ResponseCorporateI>(`${this.apiCorporate}${id}`, {
        headers: this.header,
      })
      .toPromise();
    console.log(promise.data.corporativo);
    return promise.data.corporativo;
  }
  putCorporate(corporate: PutCorporateI, id): Observable<PutCorporateI> {
    let res;
    res = this.http.put<PutCorporateI>(`${this.apiCorporate}${id}`, corporate, {
      headers: this.header,
    });
    return res;
  }

  createContact(contact) {
    let res;
    res = this.http.post<PostContactoI>(this.apiContact, contact, {
      headers: this.header,
    }).subscribe(res => {console.log(res)});
    return res;
  }
  updateContact(id, contact) {
    let res;
    res = this.http.put<PostContactoI>(`${this.apiContact}/${id}`, contact, {
      headers: this.header,
    })//.subscribe(res => console.log(res))
      ;
    return res;
  }
  deleteContact(id: number) {
    let res;
    res = this.http
      .delete(`${this.apiDeleteContact}${id}`, {
        headers: this.header,
      })//.subscribe((res) => { console.log(res); });
      ;
    return res;
  }
}
