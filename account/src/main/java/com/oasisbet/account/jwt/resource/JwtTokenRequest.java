package com.oasisbet.account.jwt.resource;

import java.io.Serializable;

public class JwtTokenRequest implements Serializable {

	private static final long serialVersionUID = -5616176897013108345L;

	private String username;
	private String password;

//    {
//    	"token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbjI4bWludXRlcyIsImV4cCI6MTYwNzc0MjIyNSwiaWF0IjoxNjA3MTM3NDI1fQ.IE-xwDvNFJMlmOG7N-JYpMpvnkuGu9wJuDEtIm-X5R8te16uioumaEzMTU5nkExKMnYOC9T1WcSdseeeQQX3AA"
//    }

	public JwtTokenRequest() {
		super();
	}

	public JwtTokenRequest(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
