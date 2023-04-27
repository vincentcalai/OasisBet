package com.oasisbet.betting.odds.model;

import java.util.List;

public class BettingRestResponse extends StatusResponse {
	private List<BetEvent> betEvent;

	public List<BetEvent> getBetEvent() {
		return betEvent;
	}

	public void setBetEvent(List<BetEvent> betEvent) {
		this.betEvent = betEvent;
	}
}
