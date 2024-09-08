import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageUtil } from '../uitls/localstorage';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private apiUrl = '';
  private services = 'caja';

  constructor(
    private http: HttpClient,
    private localstorage: LocalStorageUtil,
  ) { 
    this.apiUrl = environment.ip_endpoint + this.services
  }


  async CAJA(carrito: any, total_pedido: any, rol_usuario:any): Promise<any>{
    const token = this.localstorage.get("token"); 
    const body = { carrito, total_pedido, rol_usuario };
    return this.http.post(this.apiUrl, body,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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