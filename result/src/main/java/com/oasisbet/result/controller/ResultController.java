package com.oasisbet.result.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.ResultRestResponse;
import com.oasisbet.result.service.ResultService;
import com.oasisbet.result.util.Constants;
import com.oasisbet.result.util.MockData;
import com.oasisbet.result.util.MongoDBConnection;

@RestController
@RequestMapping(path = "/result")
public class ResultController {

	Logger logger = LoggerFactory.getLogger(ResultController.class);
	MongoCollection<Document> resultCollection = MongoDBConnection.getInstance().getResultEventMappingCollection();

	@Autowired
	ResultService resultService;

	@GetMapping(value = "/retrieveResults")
	public ResultRestResponse retrieveResults(@RequestParam("compType") String compType) {

//		String baseUri = Constants.API_SOURCE_BASE_URI;
//		String uri = baseUri + compType + Constants.API_SOURCE_URI_SCORES + Constants.API_SOURCE_URI_API_KEY_PARAM
//				+ Constants.API_SOURCE_API_KEY + Constants.AMPERSAND + Constants.API_SOURCE_URI_DAYS_FROM_PARAM
//				+ Constants.API_SOURCE_URI_DEFAULT_DAY;
//		RestTemplate restTemplate = new RestTemplate();
		ResultApiResponse[] results = null;
		ResultRestResponse response = new ResultRestResponse();
		try {
//			ResponseEntity<ResultApiResponse[]> responseEntity = restTemplate.getForEntity(uri,
//					ResultApiResponse[].class);
//			results = responseEntity.getBody();

			if (compType.equals(Constants.API_SOURCE_COMP_TYPE_EPL)) {
				results = MockData.mockEplResultApiResponseArray();
			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LALIGA)) {
				results = MockData.mockLaLigaOddsApiResponseArray();
			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA)) {
				results = MockData.mockBundesligaOddsApiResponseArray();
			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_SERIE_A)) {
				results = MockData.mockSerieAOddsApiResponseArray();
			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE)) {
				results = MockData.mockLigueOneOddsApiResponseArray();
			}
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
		List<ResultEventMapping> resultEventMappingList = new ArrayList<>();
		Document filter = new Document("completed", true);
		FindIterable<Document> results = resultCollection.find(filter);
		for (Document result : results) {
			ResultEventMapping resultEventMapping = new ResultEventMapping();
			resultEventMapping.setEventId(result.getLong("event_id"));
			resultEventMapping.setApiEventId(result.getString("api_event_id"));
			resultEventMapping.setCompType(result.getString("comp_type"));
			resultEventMapping.setScore(result.getString("score"));
			resultEventMapping.setOutcome(result.getString("outcome"));
			resultEventMapping.setCompleted(result.getBoolean("completed"));
			resultEventMappingList.add(resultEventMapping);
		}
		return resultEventMappingList;
	}

}
