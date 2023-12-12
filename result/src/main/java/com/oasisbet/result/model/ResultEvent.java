package com.oasisbet.result.model;

import java.math.BigInteger;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultEvent {

	private BigInteger eventId;
	private String compType;
	private String eventDesc;
	private Date startTime;
	private boolean completed;
	private String homeTeam;
	private String awayTeam;
	private String score;
	private Date lastUpdatedDt;

	public ResultEvent(BigInteger eventId, String compType, String eventDesc, Date startTime, boolean completed,
			String homeTeam, String awayTeam, String score, Date lastUpdatedDt) {
		super();
		this.eventId = eventId;
		this.compType = compType;
		this.eventDesc = eventDesc;
		this.startTime = startTime;
		this.completed = completed;
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.score = score;
		this.lastUpdatedDt = lastUpdatedDt;
	}
}
