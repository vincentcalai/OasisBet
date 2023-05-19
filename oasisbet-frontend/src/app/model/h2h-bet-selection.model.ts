import { Injectable } from "@angular/core";
import { H2HEventOdds } from "./h2h-event-odds.model";

@Injectable({
    providedIn: 'root'
})
export class H2HBetSelection {
    public homeSelected: boolean = false;
    public drawSelected: boolean = false;
    public awaySelected: boolean = false;
}