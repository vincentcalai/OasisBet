import { H2HBetSelection } from "./H2HBetSelection";
import { H2HEventOdds } from "./H2HEventOdds";
import { TeamsDetails } from "./TeamsDetails";

export class BetEvent {
    public eventId: number;
    public compType: string;
    public eventDesc: string;
    public startTime: Date;
    public teamsDetails: TeamsDetails;
    public h2hEventOdds: H2HEventOdds;
    public betSelection: H2HBetSelection;
}