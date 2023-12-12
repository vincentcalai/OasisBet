package com.oasisbet.betting.odds.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamsDetails {
	private String homeTeam;
	private String awayTeam;

	public TeamsDetails(String homeTeam, String awayTeam) {
		super();
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
	}
}
