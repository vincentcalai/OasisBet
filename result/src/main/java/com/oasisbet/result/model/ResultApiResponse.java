package com.oasisbet.result.model;

import java.util.List;

public class ResultApiResponse {
	private String id;
	private String sport_key;
	private String sport_title;
	private String commence_time;
	private boolean completed;
	private String home_team;
	private String away_team;
	private List<Score> scores;
	private String last_update;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSport_key() {
		return sport_key;
	}

	public void setSport_key(String sport_key) {
		this.sport_key = sport_key;
	}

	public String getSport_title() {
		return sport_title;
	}

	public void setSport_title(String sport_title) {
		this.sport_title = sport_title;
	}

	public String getCommence_time() {
		return commence_time;
	}

	public void setCommence_time(String commence_time) {
		this.commence_time = commence_time;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public String getHome_team() {
		return home_team;
	}

	public void setHome_team(String home_team) {
		this.home_team = home_team;
	}

	public String getAway_team() {
		return away_team;
	}

	public void setAway_team(String away_team) {
		this.away_team = away_team;
	}

	public List<Score> getScores() {
		return scores;
	}

	public void setScores(List<Score> scores) {
		this.scores = scores;
	}

	public String getLast_update() {
		return last_update;
	}

	public void setLast_update(String last_update) {
		this.last_update = last_update;
	}
}
