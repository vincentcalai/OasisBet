package com.oasisbet.result.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
}
