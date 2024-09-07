import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = '';
  private services = 'login';

  constructor(
    private http: HttpClient
  ) { 
    this.apiUrl = environment.ip_endpoint + this.services
  }


  async SIGN_IN(usernameOrEmail: string, password: string): Promise<any>{
    const body = { usernameOrEmail, password };
    return this.http.post(this.apiUrl, body,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
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