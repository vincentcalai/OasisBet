package com.oasisbet.betting.odds.model.response;

import com.oasisbet.betting.odds.model.AccountVO;

public class AccountRestResponse extends StatusResponse {
	private AccountVO account;

	public AccountVO getAccount() {
		return account;
	}

	public void setAccount(AccountVO account) {
		this.account = account;
	}

}
