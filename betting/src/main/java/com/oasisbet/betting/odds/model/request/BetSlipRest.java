package com.oasisbet.betting.odds.model.request;

import java.util.List;

import com.oasisbet.betting.odds.model.BetSubmissionVO;

public class BetSlipRest {
	private List<BetSubmissionVO> betSlip;

	public List<BetSubmissionVO> getBetSlip() {
		return betSlip;
	}

	public void setBetSlip(List<BetSubmissionVO> betSlip) {
		this.betSlip = betSlip;
	}
}
