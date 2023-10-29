package com.oasisbet.account.model;

import java.util.Date;

public class TrxBetDetailsVO {
	private Date startTime;
	private String competition;
	private String betDetails;
	private String betType;
	private Boolean status;
	private String trxId;

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public String getCompetition() {
		return competition;
	}

	public void setCompetition(String competition) {
		this.competition = competition;
	}

	public String getBetDetails() {
		return betDetails;
	}

	public void setBetDetails(String betDetails) {
		this.betDetails = betDetails;
	}

	public String getBetType() {
		return betType;
	}

	public void setBetType(String betType) {
		this.betType = betType;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getTrxId() {
		return trxId;
	}

	public void setTrxId(String trxId) {
		this.trxId = trxId;
	}

}
