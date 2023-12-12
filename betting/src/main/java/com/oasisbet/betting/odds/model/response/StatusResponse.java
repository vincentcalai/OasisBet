package com.oasisbet.betting.odds.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusResponse {
	private int statusCode = 0;
	private String resultMessage;
}
