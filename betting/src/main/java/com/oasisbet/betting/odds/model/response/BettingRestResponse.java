package com.oasisbet.betting.odds.model.response;

import java.util.List;

import com.oasisbet.betting.odds.model.BetEvent;

public class BettingRestResponse extends StatusResponse {
	private List<BetEvent> betEvent;

	public List<BetEvent> getBetEvent() {
		return betEvent;
	}

	public void setBetEvent(List<BetEvent> betEvent) {
		this.betEvent = betEvent;
	}
}
