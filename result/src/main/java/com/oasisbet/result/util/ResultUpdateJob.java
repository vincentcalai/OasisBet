package com.oasisbet.result.util;

import org.bson.Document;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import com.mongodb.client.MongoCollection;
import com.oasisbet.result.model.ResultApiResponse;

@Service
public class ResultUpdateJob implements Job {

	MongoCollection<Document> collection = MongoDBConnection.getInstance().getSportsEventMappingCollectionCollection();

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
					} else {
						log.info("result NOT found in db, api_event_id: " + apiEventId);
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
