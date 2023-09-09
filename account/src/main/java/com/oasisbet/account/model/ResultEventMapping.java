package com.oasisbet.account.model;

import java.util.Date;

public class ResultEventMapping {
	private long eventId;
	private String apiEventId;
	private String compType;
	private String score;
	private String outcome;
	private boolean completed;
	private Date completedDt;

	public long getEventId() {
		return eventId;
	}

	public void setEventId(long eventId) {
		this.eventId = eventId;
	}

	public String getApiEventId() {
		return apiEventId;
	}

	public void setApiEventId(String apiEventId) {
		this.apiEventId = apiEventId;
	}

	public String getCompType() {
		return compType;
	}

	public void setCompType(String compType) {
		this.compType = compType;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getOutcome() {
		return outcome;
	}

	public void setOutcome(String outcome) {
		this.outcome = outcome;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public Date getCompletedDt() {
		return completedDt;
	}

	public void setCompletedDt(Date completedDt) {
		this.completedDt = completedDt;
	}
}
