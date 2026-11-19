// src/app/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { environment } from '../../environments/environment';
import { environment as mobileEnv } from '../../environments/environment.mobile';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {
    console.log('[AuthService] platform =', Capacitor.getPlatform());
    console.log('[AuthService] apiUrl  =', this.apiUrl);
  }

  /**
   * URL base resuelta según el entorno:
   * - Si compilaste con --configuration production -> environment.prod.ts (apiUrl de prod)
   * - Si compilaste con --configuration mobile     -> environment.mobile.ts (IP LAN)
   * - Si compilaste con --configuration development-> environment.ts (localhost)
   *
   * Pero además, en runtime: si estás en móvil nativo y el environment cargado
   * apunta a localhost, lo cambiamos a la URL móvil (útil si olvidaste compilar
   * con --configuration mobile).
   */
  private get apiUrl(): string {
    // Si estamos en móvil nativo y la URL base apunta a localhost/127.0.0.1,
    // sustituimos por la URL móvil (IP LAN).
    if (
      Capacitor.isNativePlatform() &&
      /localhost|127\.0\.0\.1/.test(environment.apiUrl)
    ) {
      return mobileEnv.apiUrl;
    }
    return environment.apiUrl;
  }

  register(data: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, data);
  }
}