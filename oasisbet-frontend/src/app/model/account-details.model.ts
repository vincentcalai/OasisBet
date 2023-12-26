import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsModel {
    public username: string;
    public oldPassword: string;
    public newPassword: string;
    public email: string;
    public contactNo: string;
}
