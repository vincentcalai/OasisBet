package com.oasisbet.account.model.request;

import java.util.List;

import com.oasisbet.account.model.BetSubmissionVO;

public class BetSlipRest {
	private Long userId;
	private List<BetSubmissionVO> betSlip;

	public List<BetSubmissionVO> getBetSlip() {
		return betSlip;
	}

	public void setBetSlip(List<BetSubmissionVO> betSlip) {
		this.betSlip = betSlip;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
