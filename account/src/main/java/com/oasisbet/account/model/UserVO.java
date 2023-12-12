package com.oasisbet.account.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserVO {
	private Long id;
	private String username;
	private String password;
	private String email;
	private String contactNo;
	private String delInd;
	private Date createdDt;
}
