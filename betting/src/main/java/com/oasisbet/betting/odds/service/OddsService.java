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

import com.mongodb.client.FindIterable;
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
import com.oasisbet.betting.odds.util.Constants;
import com.oasisbet.betting.odds.util.MongoDBConnection;

@Service
public class OddsService {

	private Logger logger = LoggerFactory.getLogger(OddsService.class);

	MongoCollection<Document> collection = MongoDBConnection.getInstance().getCollection();

	public List<BetEvent> retrieveBetEventByCompType(String compType) {

		Bson filter = Filters.eq(Constants.COMP_TYPE, compType);
		FindIterable<Document> results = collection.find(filter);

		List<BetEvent> betEventList = new ArrayList<>();
		for (Document result : results) {
			Long eventId = result.getLong(Constants.EVENT_ID);
			double homeOdds = result.getDouble(Constants.HOME_ODDS);
			double awayOdds = result.getDouble(Constants.AWAY_ODDS);
			double drawOdds = result.getDouble(Constants.DRAW_ODDS);
			H2HEventOdds h2hEventOdds = new H2HEventOdds(homeOdds, drawOdds, awayOdds);
			h2hEventOdds.setEventId(eventId);

			Date startTime = result.getDate(Constants.COMMENCE_TIME);

			String homeTeam = result.getString(Constants.HOME_TEAM);
			String awayTeam = result.getString(Constants.AWAY_TEAM);

			TeamsDetails teamDetails = new TeamsDetails(homeTeam, awayTeam);

			String eventDesc = homeTeam + " vs " + awayTeam;
			String competition = Constants.API_SOURCE_COMP_TYPE_MAP.getOrDefault(compType, Constants.EMPTY_STRING);
			BetEvent event = new BetEvent(competition, eventDesc, startTime, teamDetails, h2hEventOdds);
			event.setEventId(eventId);
			betEventList.add(event);
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

	public void updateCurrBetEvents(String compType, OddsApiResponse[] results) {
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

				try {
					Date startTime = convertCommenceTimeToDate(result.getCommence_time());

					List<Bookmaker> bookmakerList = result.getBookmakers();
					if (bookmakerList != null && bookmakerList.size() > 0) {
						Bookmaker bookmaker = bookmakerList.get(0);
						List<Market> marketList = bookmaker.getMarkets();
						Market market = marketList.get(0);
						List<Outcome> outcomeList = market.getOutcomes();
						Outcome homeOutcome = outcomeList.get(0).getName().equals(result.getHome_team())
								? outcomeList.get(0)
								: outcomeList.get(1);
						Outcome awayOutcome = outcomeList.get(1).getName().equals(result.getAway_team())
								? outcomeList.get(1)
								: outcomeList.get(0);
						Outcome drawOutcome = outcomeList.get(2);
						double homeOdds = homeOutcome.getPrice();
						double awayOdds = awayOutcome.getPrice();
						double drawOdds = drawOutcome.getPrice();

						Long eventId = getSequenceValue(collection, compType);

						// Create a new document for the bet event
						Document newBetEventDocument = new Document();
						newBetEventDocument.append(Constants.EVENT_ID, eventId)
								.append(Constants.API_EVENT_ID, apiEventId).append(Constants.COMP_TYPE, compType)
								.append(Constants.EVENT_TYPE, Constants.EVENT_TYPE_1X2)
								.append(Constants.COMMENCE_TIME, startTime)
								.append(Constants.HOME_TEAM, result.getHome_team())
								.append(Constants.AWAY_TEAM, result.getAway_team())
								.append(Constants.HOME_ODDS, homeOdds).append(Constants.AWAY_ODDS, awayOdds)
								.append(Constants.DRAW_ODDS, drawOdds).append(Constants.COMPLETED, Constants.FALSE)
								.append(Constants.CREATED_DT, new Date());
						// Insert the document into the local table
						collection.insertOne(newBetEventDocument);
						logger.info("Bet event with id: {}, mapped to: {} inserted into the collection.", apiEventId,
								eventId);
					}
				} catch (ParseException e) {
					logger.error("error parsing date ", e);
				}

			}

		}

	}

	private Date convertCommenceTimeToDate(String dateString) throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		Date startTime = dateFormat.parse(dateString);

		// Convert to SG time - add 8 hours to the start time
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startTime);

		calendar.add(Calendar.HOUR_OF_DAY, 8);
		startTime = calendar.getTime();
		return startTime;
	}

}
