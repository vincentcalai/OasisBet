package com.oasisbet.result.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusResponse {
	private int statusCode = 0;
	private String resultMessage;
}
