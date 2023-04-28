import { Injectable } from "@angular/core";
import { H2HEventOdds } from "./h2h-event-odds.model";

@Injectable({
    providedIn: 'root'
})
export class ResultEvent {
    public eventId: number;
    public competition: string;
    public eventDesc: string;
    public startTime: Date;
    public completed: boolean;
    public homeTeam: string;
    public awayTeam: string;
    public score: string;
    public lastUpdated: Date;
}