package com.oasisbet.betting.odds.model;

public class TeamsDetails {
	private String homeTeam;
	private String awayTeam;

	public TeamsDetails(String homeTeam, String awayTeam) {
		super();
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
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

}
