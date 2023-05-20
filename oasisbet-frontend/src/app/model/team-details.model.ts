import { Injectable } from "@angular/core";
import { H2HEventOdds } from "./h2h-event-odds.model";
import { H2HBetSelection } from "./h2h-bet-selection.model";

@Injectable({
    providedIn: 'root'
})
export class TeamsDetails {
    public homeTeam: string;
    public awayTeam: string;
}