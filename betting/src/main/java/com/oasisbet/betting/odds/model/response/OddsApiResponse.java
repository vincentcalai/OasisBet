package com.oasisbet.betting.odds.model.response;

import java.util.List;

import com.oasisbet.betting.odds.model.Bookmaker;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OddsApiResponse {
	private String id;
	private String sport_key;
	private String sport_title;
	private String commence_time;
	private String home_team;
	private String away_team;
	private List<Bookmaker> bookmakers;
}
