import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccountPwModel {
    public username: string;
    public oldPassword: string;
    public newPassword: string;
}
