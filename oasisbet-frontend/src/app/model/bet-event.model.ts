import { Injectable } from "@angular/core";
import { H2HEventOdds } from "./h2h-event-odds.model";
import { H2HBetSelection } from "./h2h-bet-selection.model";
import { TeamsDetails } from "./team-details.model";

@Injectable({
    providedIn: 'root'
})
export class BetEvent {
    public eventId: number;
    public compType: string;
    public eventDesc: string;
    public startTime: Date;
    public teamsDetails: TeamsDetails;
    public h2hEventOdds: H2HEventOdds;
    public betSelection: H2HBetSelection;
}