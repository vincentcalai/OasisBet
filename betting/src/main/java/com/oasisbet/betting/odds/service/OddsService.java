package com.oasisbet.betting.odds.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
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
import com.oasisbet.betting.util.EventIdGenerator;
import com.oasisbet.betting.util.MongoDBConnection;

@Service
public class OddsService {

	private Logger logger = LoggerFactory.getLogger(OddsService.class);

	public List<BetEvent> processMapping(OddsApiResponse[] results) throws ParseException {
		List<BetEvent> betEventList = new ArrayList<>();
		for (OddsApiResponse result : results) {
			List<Bookmaker> bookmakerList = result.getBookmakers();
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
				betEventList.add(event);
			}
		}

		betEventList = betEventList.stream().sorted(Comparator.comparing(BetEvent::getStartTime)).map(event -> {
			long eventId = EventIdGenerator.nextId();
			event.setEventId(eventId);
			H2HEventOdds h2hEventOdds = event.getH2hEventOdds();
			h2hEventOdds.setEventId(eventId);
			event.setH2hEventOdds(h2hEventOdds);
			return event;
		}).collect(Collectors.toList());
		return betEventList;
	}

	public long getSequenceValue(MongoCollection<Document> collection, String compType) {
		// Find the document with the highest _id value
		Document document = collection.find(Filters.eq("comp_type", compType)).sort(Sorts.descending("event_id"))
				.limit(1).first();

		// If no documents exist yet, start the sequence at 0
		if (document == null) {
			switch (compType) {
			case Constants.API_SOURCE_COMP_TYPE_EPL:
				return 1000000;
			case Constants.API_SOURCE_COMP_TYPE_LALIGA:
				return 2000000;
			case Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA:
				return 3000000;
			case Constants.API_SOURCE_COMP_TYPE_SERIE_A:
				return 4000000;
			case Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE:
				return 5000000;
			default:
				throw new IllegalArgumentException("Invalid competition type: " + compType);
			}
		}

		// Get the value of the highest _id and return it
		return document.getInteger("event_id") + 1;
	}

	public void syncAllBetEvents(String compType, OddsApiResponse[] results) {
		MongoCollection<Document> collection = MongoDBConnection.getInstance().getCollection();
		// long betEventSeq = getSequenceValue(collection, compType);

		List<OddsApiResponse> resultsList = new ArrayList<>(Arrays.asList(results));

		// check for missing bet events in DB and insert them
		for (OddsApiResponse result : resultsList) {
			String id = result.getId();
			Bson filter = Filters.and(Filters.eq("comp_type", compType), Filters.eq("api_event_id", id));

			boolean recordExists = collection.find(filter).limit(1).iterator().hasNext();

			if (!recordExists) {
				// Record does not exists in the collection
				logger.info("id: " + id + " does not exist in MongoDB");
				// implement insert of bet event from api source here
			}
		}

		List<String> apiSourceIdList = resultsList.stream().map(OddsApiResponse::getId).collect(Collectors.toList());

		// check for ended bet events in DB and remove them
		for (Document document : collection.find(Filters.eq("comp_type", compType))) {
			String apiEventId = document.getString("api_event_id");
			if (!apiSourceIdList.contains(apiEventId)) {
				logger.info("id: " + apiEventId + " exist in local table but does not exist in the api source");
				// implement remove of bet event in local table here

			}
		}

	}

}
