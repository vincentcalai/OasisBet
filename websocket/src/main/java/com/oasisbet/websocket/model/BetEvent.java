package com.oasisbet.websocket.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.util.Date;

@Getter
@Setter
public class BetEvent {
	private BigInteger eventId;
	private String compType;
	private String eventDesc;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date startTime;
	private TeamsDetails teamsDetails;
	private H2HEventOdds h2hEventOdds;

	public BetEvent(String compType, String eventDesc, Date startTime, TeamsDetails teamsDetails,
                    H2HEventOdds h2hEventOdds) {
		super();
		this.compType = compType;
		this.eventDesc = eventDesc;
		this.startTime = startTime;
		this.teamsDetails = teamsDetails;
		this.h2hEventOdds = h2hEventOdds;
	}
}
