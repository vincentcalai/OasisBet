package com.oasisbet.account.model;

import java.math.BigInteger;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultEventMapping {
	private BigInteger eventId;
	private String apiEventId;
	private String compType;
	private String score;
	private String outcome;
	private boolean completed;
	private Date lastUpdatedDt;
}
