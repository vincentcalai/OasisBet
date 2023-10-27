import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TrxHistModel {

    public dateTime: Date;
    public desc: string;
    public type: string;
    public amount: number;
}
