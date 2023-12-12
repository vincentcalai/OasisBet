package com.oasisbet.betting.odds.model;

import java.math.BigInteger;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BetEvent {
	private BigInteger eventId;
	private String compType;
	private String eventDesc;
	private Date startTime;
	private TeamsDetails teamsDetails;
	private H2HEventOdds h2hEventOdds;

	public BetEvent(String compType, String eventDesc, Date startTime, TeamsDetails teamsDetails,
			H2HEventOdds h2hEventOdds) {
		super();
		this.compType = compType;
		this.eventDesc = eventDesc;
		this.startTime = startTime;
		this.teamsDetails = teamsDetails;
		this.h2hEventOdds = h2hEventOdds;
	}
}
