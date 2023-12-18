import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChangeAccountPwModel {
    public oldPassword: string;
    public newPassword: string;
}
