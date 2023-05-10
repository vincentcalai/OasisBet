package com.oasisbet.account.model.response;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.StatusResponse;

public class AccountRestResponse extends StatusResponse {
	private AccountVO account;

	public AccountVO getAccount() {
		return account;
	}

	public void setAccount(AccountVO account) {
		this.account = account;
	}

}
