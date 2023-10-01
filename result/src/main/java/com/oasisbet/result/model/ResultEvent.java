package com.oasisbet.result.model;

import java.math.BigInteger;
import java.util.Date;

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

	public BigInteger getEventId() {
		return eventId;
	}

	public void setEventId(BigInteger eventId) {
		this.eventId = eventId;
	}

	public String getCompType() {
		return compType;
	}

	public void setCompType(String compType) {
		this.compType = compType;
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

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public String getHomeTeam() {
		return homeTeam;
	}

	public void setHomeTeam(String homeTeam) {
		this.homeTeam = homeTeam;
	}

	public String getAwayTeam() {
		return awayTeam;
	}

	public void setAwayTeam(String awayTeam) {
		this.awayTeam = awayTeam;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public Date getLastUpdatedDt() {
		return lastUpdatedDt;
	}

	public void setLastUpdatedDt(Date lastUpdatedDt) {
		this.lastUpdatedDt = lastUpdatedDt;
	}
}
