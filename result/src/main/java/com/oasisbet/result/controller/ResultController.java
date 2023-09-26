package com.oasisbet.result.controller;

import java.text.ParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.ResultRestResponse;
import com.oasisbet.result.service.ResultService;
import com.oasisbet.result.util.Constants;

@RestController
@RequestMapping(path = "/result")
public class ResultController {

	Logger logger = LoggerFactory.getLogger(ResultController.class);

	@Autowired
	ResultService resultService;

	@GetMapping(value = "/retrieveResults")
	public ResultRestResponse retrieveResults(@RequestParam("compType") String compType) {

		String baseUri = Constants.API_SOURCE_BASE_URI;
		String uri = baseUri + compType + Constants.API_SOURCE_URI_SCORES + Constants.API_SOURCE_URI_API_KEY_PARAM
				+ Constants.API_SOURCE_API_KEY + Constants.AMPERSAND + Constants.API_SOURCE_URI_DAYS_FROM_PARAM
				+ Constants.API_SOURCE_URI_DEFAULT_DAY;
		RestTemplate restTemplate = new RestTemplate();
		ResultApiResponse[] results = null;
		ResultRestResponse response = new ResultRestResponse();
		try {
			ResponseEntity<ResultApiResponse[]> responseEntity = restTemplate.getForEntity(uri,
					ResultApiResponse[].class);
			results = responseEntity.getBody();

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
			List<ResultEvent> resultEventList = resultService.processMapping(results);
			response.setResultEvent(resultEventList);
			return response;
		} catch (RestClientException e) {
			logger.error("error retrieve response from the-odds-api.com", e);
			response.setStatusCode(1);
			response.setResultMessage(Constants.RETRIEVE_RESULT_API_EXCEPTION);
			return response;
		} catch (ParseException e) {
			logger.error("error parsing date ", e);
			response.setStatusCode(2);
			response.setResultMessage(Constants.DATE_PARSING_EXCEPTION);
			return response;
		}
	}

	@GetMapping(value = "/retrieveCompletedResults")
	public List<ResultEventMapping> retrieveCompletedResults() {
		return resultService.retrieveCompletedResults();
	}

}
