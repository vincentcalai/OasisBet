package com.oasisbet.betting.odds.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.Bookmaker;
import com.oasisbet.betting.odds.model.H2HEventOdds;
import com.oasisbet.betting.odds.model.Market;
import com.oasisbet.betting.odds.model.Outcome;
import com.oasisbet.betting.odds.model.TeamsDetails;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.util.Constants;
import com.oasisbet.betting.util.MongoDBConnection;

@Service
public class OddsService {

	private static Map<String, Long> apiSourceIdMap = new HashMap<>();

	private Logger logger = LoggerFactory.getLogger(OddsService.class);

	public List<BetEvent> processMapping(OddsApiResponse[] results) throws ParseException {
		List<BetEvent> betEventList = new ArrayList<>();
		for (OddsApiResponse result : results) {
			List<Bookmaker> bookmakerList = result.getBookmakers();
			Long eventId = apiSourceIdMap.get(result.getId());
			if (bookmakerList != null && bookmakerList.size() > 0) {
				Bookmaker bookmaker = bookmakerList.get(0);
				List<Market> marketList = bookmaker.getMarkets();
				Market market = marketList.get(0);
				List<Outcome> outcomeList = market.getOutcomes();
				Outcome homeOutcome = outcomeList.get(0).getName().equals(result.getHome_team()) ? outcomeList.get(0)
						: outcomeList.get(1);
				Outcome awayOutcome = outcomeList.get(1).getName().equals(result.getAway_team()) ? outcomeList.get(1)
						: outcomeList.get(0);
				Outcome drawOutcome = outcomeList.get(2);
				double homeOdds = homeOutcome.getPrice();
				double awayOdds = awayOutcome.getPrice();
				double drawOdds = drawOutcome.getPrice();
				H2HEventOdds h2hEventOdds = new H2HEventOdds(homeOdds, drawOdds, awayOdds);
				h2hEventOdds.setEventId(eventId);

				String dateString = result.getCommence_time();
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
				Date startTime = dateFormat.parse(dateString);

				// Convert to SG time - add 8 hours to the start time
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(startTime);

				calendar.add(Calendar.HOUR_OF_DAY, 8);
				startTime = calendar.getTime();

				String homeTeam = result.getHome_team();
				String awayTeam = result.getAway_team();

				TeamsDetails teamDetails = new TeamsDetails(homeTeam, awayTeam);

				String eventDesc = homeTeam + " vs " + awayTeam;
				String competition = result.getSport_title();
				BetEvent event = new BetEvent(competition, eventDesc, startTime, teamDetails, h2hEventOdds);
				event.setEventId(eventId);
				betEventList.add(event);
			}
		}

		betEventList = betEventList.stream().sorted(Comparator.comparing(BetEvent::getStartTime))
				.collect(Collectors.toList());
		return betEventList;
	}

	public Long getSequenceValue(MongoCollection<Document> collection, String compType) {
		// Find the document with the highest _id value
		Document document = collection.find(Filters.eq(Constants.COMP_TYPE, compType))
				.sort(Sorts.descending(Constants.EVENT_ID)).limit(1).first();

		// If no documents exist yet, start the sequence at 0
		if (document == null) {
			switch (compType) {
			case Constants.API_SOURCE_COMP_TYPE_EPL:
				return 1000000L;
			case Constants.API_SOURCE_COMP_TYPE_LALIGA:
				return 2000000L;
			case Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA:
				return 3000000L;
			case Constants.API_SOURCE_COMP_TYPE_SERIE_A:
				return 4000000L;
			case Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE:
				return 5000000L;
			default:
				throw new IllegalArgumentException("Invalid competition type: " + compType);
			}
		}

		// Get the value of the highest _id and return it
		return document.getLong(Constants.EVENT_ID) + 1;
	}

	public void syncAllBetEvents(String compType, OddsApiResponse[] results) {
		MongoCollection<Document> collection = MongoDBConnection.getInstance().getCollection();

		Arrays.sort(results, Comparator.comparing(OddsApiResponse::getCommence_time,
				Comparator.nullsFirst(Comparator.naturalOrder())));

		// check for missing bet events in DB and insert them
		for (OddsApiResponse result : results) {
			String apiEventId = result.getId();
			Bson filter = Filters.and(Filters.eq(Constants.COMP_TYPE, compType),
					Filters.eq(Constants.API_EVENT_ID, apiEventId));

			boolean recordExists = collection.find(filter).limit(1).iterator().hasNext();

			if (!recordExists) {
				logger.info("id: {} does not exist in local table but exist in the api source", apiEventId);
				// Create a new document for the bet event
				Document newBetEventDocument = new Document();
				newBetEventDocument.append(Constants.EVENT_ID, getSequenceValue(collection, compType))
						.append(Constants.API_EVENT_ID, apiEventId).append(Constants.COMP_TYPE, compType);
				// Insert the document into the local table
				collection.insertOne(newBetEventDocument);
				logger.info("Bet event with id: {} inserted into the collection.", apiEventId);
			}

			// Map all current bet events to local HashMap
			if (!apiSourceIdMap.containsKey(apiEventId)) {
				Document document = collection.find(filter).limit(1).first();
				Long eventId = document.getLong(Constants.EVENT_ID);
				apiSourceIdMap.put(apiEventId, eventId);
			}
		}

		List<String> apiSourceIdList = Arrays.stream(results).map(OddsApiResponse::getId).collect(Collectors.toList());

		// check for ended bet events in DB and remove them
		for (Document document : collection.find(Filters.eq(Constants.COMP_TYPE, compType))) {
			String apiEventId = document.getString(Constants.API_EVENT_ID);
			if (!apiSourceIdList.contains(apiEventId)) {
				logger.info("id: {} exist in local table but does not exist in the api source", apiEventId);
				// Remove of bet event in local table
				collection.deleteOne(Filters.eq(Constants.API_EVENT_ID, apiEventId));
				logger.info("Deleted record with apiEventId: {}", apiEventId);
			}
		}

	}

}
