import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageUtil } from '../uitls/localstorage';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = '';
  private services = 'get-pedidos';

  constructor(
    private http: HttpClient,
    private localstorage: LocalStorageUtil,
  ) { 
    this.apiUrl = environment.ip_endpoint + this.services;
  }

  async getPedidos(): Promise<any>{
    const token = this.localstorage.get("token");
    return this.http.get(this.apiUrl,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        })
      }).toPromise()
      .then(this.extractData)
      .catch(this.extractData);
  }

  private extractData(res: any) {
    let body = res;
    return body;
  }
}
