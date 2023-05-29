import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TrxHistModel {

    public dateTime: Date;
    public desc: number;
    public amount: number;
}
