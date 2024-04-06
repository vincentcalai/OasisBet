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

    console.log("data generated: ", eventsMap);

    return eventsMap;
}