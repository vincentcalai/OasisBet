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

export function generateSampleData() {
    const eventsMap = new Map();

        const eventId1 = 100001;
        const compType1 = 'soccer_epl';
        const eventDesc1 = 'Chelsea vs Manchester United';
        const startTime1 = new Date(); 
        const teamsDetails1 = new TeamsDetails('Chelsea', 'Manchester United');
        const h2hEventOdds1 = new H2HEventOdds(100001, '2.03', '3.55', '3.20');
        const betSelection1 = new H2HBetSelection();

        const betEvent1 = new BetEvent(eventId1, compType1, eventDesc1, startTime1, teamsDetails1, h2hEventOdds1, betSelection1);

        const eventId2 = 100002;
        const compType2 = 'soccer_epl';
        const eventDesc2 = 'Sheffield United vs Arsenal';
        const startTime2 = new Date(); 
        const teamsDetails2 = new TeamsDetails('Sheffield United', 'Arsenal');
        const h2hEventOdds2 = new H2HEventOdds(100002, '10.55', '5.60', '1.15');
        const betSelection2 = new H2HBetSelection();

        const betEvent2 = new BetEvent(eventId2, compType2, eventDesc2, startTime2, teamsDetails2, h2hEventOdds2, betSelection2);

        const eventId3 = 100003;
        const compType3 = 'soccer_epl';
        const eventDesc3 = 'Crystal Palace vs Brighton & Hove Albion';
        const startTime3 = new Date(); 
        const teamsDetails3 = new TeamsDetails('Crystal Palace', 'Brighton & Hove Albion');
        const h2hEventOdds3 = new H2HEventOdds(100003, '3.05', '3.5', '2.80');
        const betSelection3 = new H2HBetSelection();

        const betEvent3 = new BetEvent(eventId3, compType3, eventDesc3, startTime3, teamsDetails3, h2hEventOdds3, betSelection3);

        const date = '2024-04-06'; 
        if (!eventsMap.has(date)) {
            eventsMap.set(date, []);
        }
        eventsMap.get(date).push(betEvent1);
        eventsMap.get(date).push(betEvent2);
        eventsMap.get(date).push(betEvent3);

    const eventId4 = 100004;
        const compType4 = 'soccer_epl';
        const eventDesc4 = 'Manchester City vs Newcastle United';
        const startTime4 = new Date(); 
        const teamsDetails4 = new TeamsDetails('Manchester City', 'Newcastle United');
        const h2hEventOdds4 = new H2HEventOdds(100004, '1.40', '3.90', '6.50');
        const betSelection4 = new H2HBetSelection();

        const betEvent4 = new BetEvent(eventId4, compType4, eventDesc4, startTime4, teamsDetails4, h2hEventOdds4, betSelection4);

        const eventId5 = 100005;
        const compType5 = 'soccer_epl';
        const eventDesc5 = 'Tottenham Hotspur vs West Ham United';
        const startTime5 = new Date(); 
        const teamsDetails5 = new TeamsDetails('Tottenham Hotspur', 'West Ham United');
        const h2hEventOdds5 = new H2HEventOdds(100005, '1.70', '3.50', '3.85');
        const betSelection5 = new H2HBetSelection();

        const betEvent5 = new BetEvent(eventId5, compType5, eventDesc5, startTime5, teamsDetails5, h2hEventOdds5, betSelection5);

        const eventId6 = 100006;
        const compType6 = 'soccer_epl';
        const eventDesc6 = 'Luton Town vs Aston Villa';
        const startTime6 = new Date(); 
        const teamsDetails6 = new TeamsDetails('Luton Town', 'Aston Villa');
        const h2hEventOdds6 = new H2HEventOdds(100006, '4.05', '3.65', '1.85');
        const betSelection6 = new H2HBetSelection();

        const betEvent6 = new BetEvent(eventId6, compType6, eventDesc6, startTime6, teamsDetails6, h2hEventOdds6, betSelection6);

        const date2 = '2024-04-07'; 

        if (!eventsMap.has(date2)) {
            eventsMap.set(date2, []);
        }
        eventsMap.get(date2).push(betEvent4);
        eventsMap.get(date2).push(betEvent5);
        eventsMap.get(date2).push(betEvent6);
    return eventsMap;
}