package com.oasisbet.result.model;

import java.math.BigInteger;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sports_event_mapping")
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

	public BigInteger getEventId() {
		return eventId;
	}

	public void setEventId(BigInteger eventId) {
		this.eventId = eventId;
	}

	public String getApiEventId() {
		return apiEventId;
	}

	public void setApiEventId(String apiEventId) {
		this.apiEventId = apiEventId;
	}

	public String getCompType() {
		return compType;
	}

	public void setCompType(String compType) {
		this.compType = compType;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public Date getCommenceTime() {
		return commenceTime;
	}

	public void setCommenceTime(Date commenceTime) {
		this.commenceTime = commenceTime;
	}

	public String getHomeTeam() {
		return homeTeam;
	}

	public void setHomeTeam(String homeTeam) {
		this.homeTeam = homeTeam;
	}

	public String getAwayTeam() {
		return awayTeam;
	}

	public void setAwayTeam(String awayTeam) {
		this.awayTeam = awayTeam;
	}

	public Double getHomeOdds() {
		return homeOdds;
	}

	public void setHomeOdds(Double homeOdds) {
		this.homeOdds = homeOdds;
	}

	public Double getAwayOdds() {
		return awayOdds;
	}

	public void setAwayOdds(Double awayOdds) {
		this.awayOdds = awayOdds;
	}

	public Double getDrawOdds() {
		return drawOdds;
	}

	public void setDrawOdds(Double drawOdds) {
		this.drawOdds = drawOdds;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	public Date getCreateDt() {
		return createDt;
	}

	public void setCreateDt(Date createDt) {
		this.createDt = createDt;
	}

}