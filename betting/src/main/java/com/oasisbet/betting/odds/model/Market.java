package com.oasisbet.betting.odds.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Market {
	private String key;
	private String last_update;
	private List<Outcome> outcomes;
}
