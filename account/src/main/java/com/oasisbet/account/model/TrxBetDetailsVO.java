package com.oasisbet.account.model;

import java.util.Date;

public class TrxBetDetailsVO {
	private Date startTime;
	private String compType;
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

	public String getCompType() {
		return compType;
	}

	public void setCompType(String compType) {
		this.compType = compType;
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
