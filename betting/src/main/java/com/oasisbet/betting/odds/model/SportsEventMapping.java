package com.oasisbet.betting.odds.model;

import java.math.BigInteger;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "sports_event_mapping")
@Getter
@Setter
public class SportsEventMapping {
	@Id
	private BigInteger eventId;
	private String apiEventId;
	private String compType;
	private String eventType;
	private Date commenceTime;
	private String homeTeam;
	private String awayTeam;
	private Double homeOdds;
	private Double awayOdds;
	private Double drawOdds;
	private Boolean completed;
	private Date createDt;
}