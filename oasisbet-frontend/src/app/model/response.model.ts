import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ResponseModel {
  statusCode: number;
  resultMessage: string;
}
