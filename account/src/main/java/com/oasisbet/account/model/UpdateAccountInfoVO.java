package com.oasisbet.account.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAccountInfoVO {
	private String username;
	private String oldPassword;
	private String newPassword;
}
