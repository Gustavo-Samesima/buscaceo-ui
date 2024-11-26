import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CnpjService {
  private baseUrl = 'https://brasilapi.com.br/api/cnpj/v1/';

  constructor(private http: HttpClient) { }

  getCnpjDetails(cnpj: string): Observable<any> {
    console.log('Consultando CNPJ:', cnpj);
    return this.http.get(`${this.baseUrl}${cnpj}`);
  }
}
