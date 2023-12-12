package com.oasisbet.result.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultRestResponse extends StatusResponse {
	private List<ResultEvent> resultEvent;
}
