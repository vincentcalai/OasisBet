package com.oasisbet.result.util;

import java.util.Date;
import java.util.List;

import org.bson.Document;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.Score;
import com.oasisbet.result.service.ResultService;

@Service
public class ResultUpdateJob implements Job {

	MongoCollection<Document> resultCollection = MongoDBConnection.getInstance().getResultEventMappingCollection();
	MongoCollection<Document> sportsCollection = MongoDBConnection.getInstance().getSportsEventMappingCollection();

	@Autowired
	ResultService resultService;

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(ResultUpdateJob.class);

		log.info("executing ResultUpdateJob...");

		for (String compType : Constants.COMP_TYPE_LIST) {
			String baseUri = Constants.API_SOURCE_BASE_URI;
//			String uri = baseUri + compType + Constants.API_SOURCE_URI_SCORES + Constants.API_SOURCE_URI_API_KEY_PARAM
//					+ Constants.API_SOURCE_API_KEY + Constants.AMPERSAND + Constants.API_SOURCE_URI_DAYS_FROM_PARAM
//					+ Constants.API_SOURCE_URI_DEFAULT_DAY;
//			RestTemplate restTemplate = new RestTemplate();
			ResultApiResponse[] results = null;
			try {
//				ResponseEntity<ResultApiResponse[]> responseEntity = restTemplate.getForEntity(uri,
//						ResultApiResponse[].class);
//				results = responseEntity.getBody();

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

				for (ResultApiResponse result : results) {
					String apiEventId = result.getId();
					List<Score> scoreList = result.getScores();
					String homeScore = "";
					String awayScore = "";
					String finalScore = "";
					String outcomeResult = null;
					if (scoreList != null && scoreList.size() == 2) {
						StringBuilder scoreSb = new StringBuilder();
						homeScore = scoreList.get(0).getScore();
						awayScore = scoreList.get(1).getScore();
						finalScore = scoreSb.append(homeScore).append("-").append(awayScore).toString();
						outcomeResult = resultService.determineOutcome(homeScore, awayScore);
					}

					Document searchQuery = new Document("api_event_id", apiEventId);
					Document searchResult = resultCollection.find(searchQuery).first();
					if (searchResult != null) {
						log.info("result event is found in db, api_event_id: " + apiEventId);

						Boolean completed = false;
						boolean updateResultFlag = resultService.validateUpdateResultFlag(searchResult);

						if (searchResult.containsKey("completed")) {
							completed = searchResult.getBoolean("completed");
							// if event is completed - Update score, outcome, completed flag & completed_dt
							if (!completed && updateResultFlag && !finalScore.isEmpty() && !outcomeResult.isEmpty()) {
								resultCollection.updateOne(Filters.eq("api_event_id", apiEventId),
										Updates.set("score", finalScore));
								resultCollection.updateOne(Filters.eq("api_event_id", apiEventId),
										Updates.set("completed_dt", new Date()));
								resultCollection.updateOne(Filters.eq("api_event_id", apiEventId),
										Updates.set("outcome", outcomeResult));
								resultCollection.updateOne(Filters.eq("api_event_id", apiEventId),
										Updates.set("completed", true));
							}
						}
					} else {
						log.info("result NOT found in db, api_event_id: " + apiEventId);
						Long eventId = null;
						// Get event ID from sports_event_mapping table
						Document searchSportsResult = sportsCollection.find(searchQuery).first();
						if (searchSportsResult != null && searchSportsResult.containsKey("event_id")) {
							eventId = searchSportsResult.getLong("event_id");
							// insert result into DB
							Document document = new Document().append("event_id", eventId)
									.append("api_event_id", apiEventId).append("comp_type", result.getSport_key())
									.append("score", finalScore).append("outcome", outcomeResult)
									.append("completed", result.isCompleted()).append("completed_dt", null);
							resultCollection.insertOne(document);
						}
					}
				}

			} catch (RestClientException e) {
				log.error("error retrieve response from the-odds-api.com", e);
			}
		}
	}

}
