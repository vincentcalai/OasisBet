package com.oasisbet.betting.odds.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.Document;
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
import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.model.response.StatusResponse;
import com.oasisbet.betting.util.Constants;
import com.oasisbet.betting.util.EventIdGenerator;
import com.oasisbet.betting.util.MongoDBConnection;

@Service
public class OddsService {
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

	public long getSequenceValue(MongoCollection<Document> collection) {
		// Find the document with the highest _id value
//		EventIdMap doc = collection.find().sort(new EventIdMap("_id", -1)).limit(1).first();
//		EventIdMap eplEvents = collection.find(Filters.eq("compType", "EPL")).sort(Sorts.ascending("eventId")).limit(1)
//				.first();
		Document document = collection.find(Filters.eq("compType", "EPL")).sort(Sorts.ascending("eventId")).limit(1)
				.first();

		// If no documents exist yet, start the sequence at 0
		if (document == null) {
			return 1000;
		}

		// Get the value of the highest _id and return it
		return document.getInteger("eventId") + 1;
	}

	public void syncNewEvents() {
		MongoCollection<Document> collection = MongoDBConnection.getInstance().getCollection();

		long betEventSeq = getSequenceValue(collection);

	}

	public StatusResponse submitBet(BetSlipRest betsInput) {
		// process bet transaction
		StatusResponse response = new StatusResponse();
		response.setResultMessage(Constants.BET_SUCCESS_MSG);
		return response;
	}

}
