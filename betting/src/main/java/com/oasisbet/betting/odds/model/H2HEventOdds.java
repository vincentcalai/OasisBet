package com.oasisbet.betting.odds.model;

import java.math.BigInteger;

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

	public BigInteger getEventId() {
		return eventId;
	}

	public void setEventId(BigInteger eventId) {
		this.eventId = eventId;
	}

	public double getHomeOdds() {
		return homeOdds;
	}

	public void setHomeOdds(double homeOdds) {
		this.homeOdds = homeOdds;
	}

	public double getDrawOdds() {
		return drawOdds;
	}

	public void setDrawOdds(double drawOdds) {
		this.drawOdds = drawOdds;
	}

	public double getAwayOdds() {
		return awayOdds;
	}

	public void setAwayOdds(double awayOdds) {
		this.awayOdds = awayOdds;
	}

}
