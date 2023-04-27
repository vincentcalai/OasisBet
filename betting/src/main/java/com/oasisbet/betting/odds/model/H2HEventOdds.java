package com.oasisbet.betting.odds.model;

public class H2HEventOdds {
	public long eventId;
	public double homeOdds;
	public double drawOdds;
	public double awayOdds;

	public H2HEventOdds(double homeOdds, double drawOdds, double awayOdds) {
		super();
		this.homeOdds = homeOdds;
		this.drawOdds = drawOdds;
		this.awayOdds = awayOdds;
	}

	public long getEventId() {
		return eventId;
	}

	public void setEventId(long eventId) {
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
