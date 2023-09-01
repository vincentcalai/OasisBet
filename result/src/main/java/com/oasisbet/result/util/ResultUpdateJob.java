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

	MongoCollection<Document> collection = MongoDBConnection.getInstance().getResultEventMappingCollection();

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
					Document searchQuery = new Document("api_event_id", apiEventId);
					Document searchResult = collection.find(searchQuery).first();
					if (searchResult != null) {
						log.info("result event is found in db, api_event_id: " + apiEventId);

						Boolean completed = false;
						String outcomeResult = null;
						List<Score> scoreList = result.getScores();
						String homeScore = "";
						String awayScore = "";
						String finalScore = "";
						if (scoreList.size() == 2) {
							homeScore = scoreList.get(0).getScore();
							awayScore = scoreList.get(1).getScore();
							finalScore = homeScore + "-" + awayScore;
							outcomeResult = resultService.determineOutcome(homeScore, awayScore);
							boolean updateResultFlag = resultService.validateUpdateResultFlag(searchResult);

							if (searchResult.containsKey("completed")) {
								completed = searchResult.getBoolean("completed");
								// if event is completed - Update score, outcome, completed flag & completed_dt
								if (!completed && updateResultFlag) {
									collection.updateOne(Filters.eq("api_event_id", apiEventId),
											Updates.set("score", finalScore));
									collection.updateOne(Filters.eq("api_event_id", apiEventId),
											Updates.set("completed_dt", new Date()));
									collection.updateOne(Filters.eq("api_event_id", apiEventId),
											Updates.set("outcome", outcomeResult));
									collection.updateOne(Filters.eq("api_event_id", apiEventId),
											Updates.set("completed", true));
								}
							}
						} else {
							log.error(
									"There is an error with getting the scores. Please check the score from the API source. API Event ID: ",
									apiEventId);
						}
					} else {
						log.info("result NOT found in db, api_event_id: " + apiEventId);
						// Get event ID from sports_event_mapping table

						// insert result into DB
					}
				}

			} catch (RestClientException e) {
				log.error("error retrieve response from the-odds-api.com", e);
			}
		}

//		MongoCollection<Document> collection = MongoDBConnection.getInstance()
//				.getSportsEventMappingCollectionCollection();
//		List<Document> eplEvents = collection.find(Filters.eq(Constants.COMP_TYPE, Constants.API_SOURCE_COMP_TYPE_EPL))
//				.sort(Sorts.ascending("eventId")).into(new ArrayList<>());
//
//		for (Document event : eplEvents) {
//			log.info("id: " + event.getLong(Constants.EVENT_ID) + " source: " + event.getString(Constants.API_EVENT_ID)
//					+ " compType: " + event.getString(Constants.COMP_TYPE));
//		}

	}

//	private int getSequenceValue(MongoCollection<EventIdMap> collection) {
//		// Find the document with the highest _id value
//		EventIdMap doc = collection.find().sort(new EventIdMap("_id", -1)).limit(1).first();
//
//		// If no documents exist yet, start the sequence at 0
//		if (doc == null) {
//			return 0;
//		}
//
//		// Get the value of the highest _id and return it
//		return doc.getInteger("_id");
//	}

}
