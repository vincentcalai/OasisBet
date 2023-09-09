package com.oasisbet.account.model.response;

import java.util.List;

import com.oasisbet.account.model.ResultEventMapping;
import com.oasisbet.account.model.StatusResponse;

public class ResultEventMappingResponse extends StatusResponse {
	private List<ResultEventMapping> resultEventMapping;

	public List<ResultEventMapping> getResultEventMapping() {
		return resultEventMapping;
	}

	public void setResultEventMapping(List<ResultEventMapping> resultEventMapping) {
		this.resultEventMapping = resultEventMapping;
	}
}
