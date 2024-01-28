package com.oasisbet.account.model.response;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.PersonalInfoVO;
import com.oasisbet.account.model.StatusResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountRestResponse extends StatusResponse {
	private AccountVO account;
	private PersonalInfoVO personalInfo;
}
