package com.oasisbet.result.model;

import java.util.Date;

public class ResultEvent {

	public long eventId;
	public String competition;
	public String eventDesc;
	public Date startTime;
	public boolean completed;
	public String homeTeam;
	public String awayTeam;
	public String score;
	public Date lastUpdated;

	public ResultEvent(long eventId, String competition, String eventDesc, Date startTime, boolean completed,
			String homeTeam, String awayTeam, String score, Date lastUpdated) {
		super();
		this.eventId = eventId;
		this.competition = competition;
		this.eventDesc = eventDesc;
		this.startTime = startTime;
		this.completed = completed;
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
		this.score = score;
		this.lastUpdated = lastUpdated;
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

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}
}
