package com.oasisbet.betting.odds.model;

import java.util.Date;

public class BetEvent {
	public long eventId;
	public String competition;
	public String eventDesc;
	public Date startTime;
	public TeamsDetails teamsDetails;
	public H2HEventOdds h2hEventOdds;

	public BetEvent(String competition, String eventDesc, Date startTime, TeamsDetails teamsDetails,
			H2HEventOdds h2hEventOdds) {
		super();
		this.competition = competition;
		this.eventDesc = eventDesc;
		this.startTime = startTime;
		this.teamsDetails = teamsDetails;
		this.h2hEventOdds = h2hEventOdds;
	}

	public long getEventId() {
		return eventId;
	}

	public void setEventId(long eventId) {
		this.eventId = eventId;
	}

	public String getCompetition() {
		return competition;
	}

	public void setCompetition(String competition) {
		this.competition = competition;
	}

	public String getEventDesc() {
		return eventDesc;
	}

	public void setEventDesc(String eventDesc) {
		this.eventDesc = eventDesc;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public TeamsDetails getTeamsDetails() {
		return teamsDetails;
	}

	public void setTeamsDetails(TeamsDetails teamsDetails) {
		this.teamsDetails = teamsDetails;
	}

	public H2HEventOdds getH2hEventOdds() {
		return h2hEventOdds;
	}

	public void setH2hEventOdds(H2HEventOdds h2hEventOdds) {
		this.h2hEventOdds = h2hEventOdds;
	}

}
