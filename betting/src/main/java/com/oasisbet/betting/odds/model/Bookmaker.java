package com.oasisbet.betting.odds.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Bookmaker {
	private String key;
	private String title;
	private String last_update;
	private List<Market> markets;
}
