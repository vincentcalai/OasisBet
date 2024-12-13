package com.oasisbet.websocket.model;

import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
public class H2HEventOdds {
	private BigInteger eventId;
	private double homeOdds;
	private double drawOdds;
	private double awayOdds;

	public H2HEventOdds(double homeOdds, double drawOdds, double awayOdds) {
		super();
		this.homeOdds = homeOdds;
		this.drawOdds = drawOdds;
		this.awayOdds = awayOdds;
	}
}
