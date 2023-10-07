package com.oasisbet.result.controller;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.ResultRestResponse;
import com.oasisbet.result.service.ResultService;

@RestController
@RequestMapping(path = "/result")
public class ResultController {

	Logger logger = LoggerFactory.getLogger(ResultController.class);

	@Autowired
	ResultService resultService;

	@Autowired
	RestTemplate restTemplate;

	@GetMapping(value = "/retrieveResults")
	public ResultRestResponse retrieveResults(@RequestParam String compType,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateFrom,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTo) {
		dateFrom = dateFrom.with(LocalTime.MIN);
		dateTo = dateTo.with(LocalTime.MAX);

		ResultRestResponse response = new ResultRestResponse();
		List<ResultEventMapping> resultEventMappingList = resultService.retrieveByCompType(compType);
//			if (compType.equals(Constants.API_SOURCE_COMP_TYPE_EPL)) {
//				results = MockData.mockEplResultApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LALIGA)) {
//				results = MockData.mockLaLigaOddsApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA)) {
//				results = MockData.mockBundesligaOddsApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_SERIE_A)) {
//				results = MockData.mockSerieAOddsApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE)) {
//				results = MockData.mockLigueOneOddsApiResponseArray();
//			}
		List<ResultEvent> resultEventList = resultService.processMapping(resultEventMappingList, dateFrom, dateTo);
		response.setResultEvent(resultEventList);
		return response;
	}

	@GetMapping(value = "/retrieveCompletedResults")
	public List<ResultEventMapping> retrieveCompletedResults() {
		return resultService.retrieveCompletedResults();
	}

}
