import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountPwModel {
    public username: string;
    public oldPassword: string;
    public newPassword: string;
}
