package com.oasisbet.account.model.request;

import java.util.List;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;

public class BetSlipRest {
	private AccountVO account;
	private List<BetSubmissionVO> betSlip;

	public List<BetSubmissionVO> getBetSlip() {
		return betSlip;
	}

	public void setBetSlip(List<BetSubmissionVO> betSlip) {
		this.betSlip = betSlip;
	}

	public AccountVO getAccount() {
		return account;
	}

	public void setAccount(AccountVO account) {
		this.account = account;
	}

}
