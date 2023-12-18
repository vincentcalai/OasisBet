package com.oasisbet.account.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAccountPwVO {
	private String username;
	private String oldPassword;
	private String newPassword;
}
