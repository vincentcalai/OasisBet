export class H2HBetSelection {
    homeSelected = false;
    drawSelected = false;
    awaySelected = false;
}

export class H2HEventOdds {
    eventId;
    homeOdds;
    drawOdds;
    awayOdds;

    constructor(eventId, homeOdds, drawOdds, awayOdds) {
        this.eventId = eventId;
        this.homeOdds = homeOdds;
        this.drawOdds = drawOdds;
        this.awayOdds = awayOdds;
    }
}

export class BetEvent {
    eventId;
    compType;
    eventDesc;
    startTime;
    teamsDetails;
    h2hEventOdds;
    betSelection;

    constructor(eventId, compType, eventDesc, startTime, teamsDetails, h2hEventOdds, betSelection) {
        this.eventId = eventId;
        this.compType = compType;
        this.eventDesc = eventDesc;
        this.startTime = startTime;
        this.teamsDetails = teamsDetails;
        this.h2hEventOdds = h2hEventOdds;
        this.betSelection = betSelection;
    }
}

export class TeamsDetails {
    homeTeam;
    awayTeam;

    constructor(homeTeam, awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }
}

export class BetSlip {
    eventId;
    eventDesc;
    compType;
    startTime;
    betSelection;
    betSelectionName;
    betTypeCd;
    odds;
    betAmount = null;
    potentialPayout = 0;
}

export class ResultEvent {
    eventId;
    compType;
    eventDesc;
    startTime;
    completed;
    homeTeam;
    awayTeam;
    score;
    lastUpdated;
}

export class LoginCredentialsModel {
    username;
    password;

    constructor(username, password){
        this.username = username;
        this.password = password;
    }
}

export class AccountModel {
    public accId: number;
    public usrId: number;
    public balance: number;
    public depositLimit: number;
    public betLimit: number;
    public depositAmt: number;
    public withdrawalAmt: number;
    public actionType: string;

    constructor(accId?, usrId?, balance?, depositLimit?, betLimit?, depositAmt?, withdrawalAmt?, actionType?) {
        this.accId = accId;
        this.usrId = usrId;
        this.balance = balance;
        this.depositLimit = depositLimit;
        this.betLimit = betLimit;
        this.depositAmt = depositAmt;
        this.withdrawalAmt = withdrawalAmt;
        this.actionType = actionType;
    }
}

export class UpdateAccountModel {
    public account: AccountModel;

    constructor(account?) {
        this.account = account;
    }
}

export class AccountDetailsModel {
    username: string;
    oldPassword: string;
    newPassword: string;
    email: string;
    contactNo: string;

    constructor(username?, oldPassword?, newPassword?, email?, contactNo?){
        this.username = username;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.email = email;
        this.contactNo = contactNo;
    }
}

export class UpdateAccountDetailsModel {
    public accountDetails: AccountDetailsModel;

    constructor(accountDetails?) {
        this.accountDetails = accountDetails;
    }
}