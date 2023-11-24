import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginCredentialsModel {
    public username: string;
    public password: string;
}
