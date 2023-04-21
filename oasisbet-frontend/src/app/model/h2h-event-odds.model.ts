import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class H2HEventOdds {
  
    public eventId: number;
    public homeOdds: number;
    public drawOdds: number;
    public awayOdds: number;
  
}