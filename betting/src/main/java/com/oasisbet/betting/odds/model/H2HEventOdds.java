package com.oasisbet.betting.odds.model;

import java.math.BigInteger;

import lombok.Getter;
import lombok.Setter;

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
