package com.oasisbet.betting.odds.model.response;

import java.util.List;

import com.oasisbet.betting.odds.model.BetEvent;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BettingRestResponse extends StatusResponse {
	private List<BetEvent> betEvent;
}
