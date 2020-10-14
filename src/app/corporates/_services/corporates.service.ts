import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.dev";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CorporatesI, ResponseCorporatesI } from '../_models/corporates.interface'
import { ResponseCorporateI, CorporateI } from "../_models/corporate.interface";

@Injectable({
  providedIn: "root",
})
export class CorporatesService {
  public apiCorporates = environment.apiURL + "/corporativos";
  public apiCorporate = environment.apiURL + "/corporativos/";

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
          console.log(res);
          return res.data;
        })
      );
  }

  getCorporate(id): Observable<CorporateI> {
    return this.http
      .get<ResponseCorporateI>(`${this.apiCorporate}${id}`, {
        headers: this.header,
      })
      .pipe(
        map((res: ResponseCorporateI) => {
          console.log(res);
          return res.data.corporativo;
        })
      );
  }
}
