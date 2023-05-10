package com.oasisbet.account.model.request;

import com.oasisbet.account.model.UserVO;

public class CreateUserRest {
	private UserVO user;

	public UserVO getUser() {
		return user;
	}

	public void setUser(UserVO user) {
		this.user = user;
	}
}
