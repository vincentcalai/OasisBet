package com.oasisbet.betting.odds.model.response;

import com.oasisbet.betting.odds.model.AccountVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountRestResponse extends StatusResponse {
	private AccountVO account;
}
