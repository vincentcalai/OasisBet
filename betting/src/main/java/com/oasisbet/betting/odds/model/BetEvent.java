package com.oasisbet.betting.odds.model;

import java.math.BigInteger;
import java.util.Date;

public class BetEvent {
	private BigInteger eventId;
	private String competition;
	private String eventDesc;
	private Date startTime;
	private TeamsDetails teamsDetails;
	private H2HEventOdds h2hEventOdds;

	public BetEvent(String competition, String eventDesc, Date startTime, TeamsDetails teamsDetails,
			H2HEventOdds h2hEventOdds) {
		super();
		this.competition = competition;
		this.eventDesc = eventDesc;
		this.startTime = startTime;
		this.teamsDetails = teamsDetails;
		this.h2hEventOdds = h2hEventOdds;
	}

	public BigInteger getEventId() {
		return eventId;
	}

	public void setEventId(BigInteger eventId) {
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
