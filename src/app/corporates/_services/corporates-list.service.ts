import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.dev";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CorporatesI, ResponseI } from '../_models/corporates.interface'

@Injectable({
  providedIn: "root",
})
export class CorporatesListService {
  public apiCorporates = environment.apiURL + "/corporativos";
  public auth_token = "Bearer " + localStorage.getItem("tokenscloud");
  options: any;

  constructor(private http: HttpClient) {}

  header: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: this.auth_token,
  });

  getCorporates(): Observable<CorporatesI[]> {
    return this.http
      .get<ResponseI>(this.apiCorporates, { headers: this.header })
      .pipe(
        map((res: ResponseI) => {
          console.log(res);
          return res.data;
        })
      );
  }
}
