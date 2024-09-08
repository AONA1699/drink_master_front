import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageUtil } from '../uitls/localstorage';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = environment.ip_endpoint + '/stock';  // URL del endpoint de stock

  constructor(private http: HttpClient, private localstorage: LocalStorageUtil,) {}

  async stock(producto_id: number, cantidad: number): Promise<any>{
    const token = this.localstorage.get("token");
    return this.http.post(this.apiUrl , { producto_id, cantidad },
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
