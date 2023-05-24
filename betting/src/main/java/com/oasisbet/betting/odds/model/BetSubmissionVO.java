package com.oasisbet.betting.odds.model;

public class BetSubmissionVO {
	public Long eventId;
	public String eventDesc;
	public Integer betSelection;
	public String betSelectionName;
	public Integer betTypeCd;
	public Double odds;
	public Double betAmount;
	public Double potentialPayout;

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public String getEventDesc() {
		return eventDesc;
	}

	public void setEventDesc(String eventDesc) {
		this.eventDesc = eventDesc;
	}

	public Integer getBetSelection() {
		return betSelection;
	}

	public void setBetSelection(Integer betSelection) {
		this.betSelection = betSelection;
	}

	public String getBetSelectionName() {
		return betSelectionName;
	}

	public void setBetSelectionName(String betSelectionName) {
		this.betSelectionName = betSelectionName;
	}

	public Integer getBetTypeCd() {
		return betTypeCd;
	}

	public void setBetTypeCd(Integer betTypeCd) {
		this.betTypeCd = betTypeCd;
	}

	public Double getOdds() {
		return odds;
	}

	public void setOdds(Double odds) {
		this.odds = odds;
	}

	public Double getBetAmount() {
		return betAmount;
	}

	public void setBetAmount(Double betAmount) {
		this.betAmount = betAmount;
	}

	public Double getPotentialPayout() {
		return potentialPayout;
	}

	public void setPotentialPayout(Double potentialPayout) {
		this.potentialPayout = potentialPayout;
	}

}