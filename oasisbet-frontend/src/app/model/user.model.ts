import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserModel {

    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public contactNo: string;
    public delInd: string;
    public createdBy: string;
    public createdDt: Date;
}
