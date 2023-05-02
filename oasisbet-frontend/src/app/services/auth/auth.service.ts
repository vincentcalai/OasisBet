import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

export const AUTH_USER = 'authenticateUser';
export const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private apiService: ApiService) { }

    jwtAuthenticate(username: string, password: string) {
      return this.apiService.jwtAuthenticate(username, password);
    }

}
