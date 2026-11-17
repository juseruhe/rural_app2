import { HttpClient } from '@angular/common/http';
import { Service, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

    private apiUrl = environment.apiUrl+"/users";

  constructor(private http: HttpClient) {}

  register(data: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }


}
