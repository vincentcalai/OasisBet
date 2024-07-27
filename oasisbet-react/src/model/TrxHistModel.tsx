import { TrxBetDetails } from "./TrxBetDetails";

export class TrxHistModel {

    public dateTime: Date;
    public desc: string;
    public type: string;
    public amount: number;
    public showDetails: boolean;
    public trxBetDetails: TrxBetDetails;
}