package com.oasisbet.betting.odds.service;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oasisbet.betting.odds.dao.ISportsEventMappingDao;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.Bookmaker;
import com.oasisbet.betting.odds.model.H2HEventOdds;
import com.oasisbet.betting.odds.model.Market;
import com.oasisbet.betting.odds.model.Outcome;
import com.oasisbet.betting.odds.model.SportsEventMapping;
import com.oasisbet.betting.odds.model.TeamsDetails;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.util.Constants;

@Service
public class OddsService {

	private Logger logger = LoggerFactory.getLogger(OddsService.class);

	@Autowired
	private ISportsEventMappingDao sportsEventMappingDao;

	public List<BetEvent> retrieveBetEventByCompType(String compType) {
		List<SportsEventMapping> sportsEventBeforeToday = sportsEventMappingDao
				.findByCompTypeAndCompletedFalse(compType);

		Date currentDate = new Date();
		List<SportsEventMapping> sportsEventsAfterToday = sportsEventBeforeToday.stream()
				.filter(event -> event.getCommenceTime().after(currentDate)).collect(Collectors.toList());

		List<BetEvent> betEventList = new ArrayList<>();
		for (SportsEventMapping sportsEvent : sportsEventsAfterToday) {
			BigInteger eventId = sportsEvent.getEventId();
			double homeOdds = sportsEvent.getHomeOdds();
			double awayOdds = sportsEvent.getAwayOdds();
			double drawOdds = sportsEvent.getDrawOdds();
			H2HEventOdds h2hEventOdds = new H2HEventOdds(homeOdds, drawOdds, awayOdds);
			h2hEventOdds.setEventId(eventId);

			Date startTime = sportsEvent.getCommenceTime();

			String homeTeam = sportsEvent.getHomeTeam();
			String awayTeam = sportsEvent.getAwayTeam();

			TeamsDetails teamDetails = new TeamsDetails(homeTeam, awayTeam);

			String eventDesc = homeTeam + " vs " + awayTeam;
			String betCompType = Constants.API_SOURCE_COMP_TYPE_MAP.getOrDefault(compType, Constants.EMPTY_STRING);
			BetEvent event = new BetEvent(betCompType, eventDesc, startTime, teamDetails, h2hEventOdds);
			event.setEventId(eventId);
			betEventList.add(event);
		}

		betEventList = betEventList.stream().sorted(Comparator.comparing(BetEvent::getStartTime))
				.collect(Collectors.toList());
		return betEventList;

	}

	public BigInteger getSequenceValue(String compType) {
		// Find the event with the highest event_id value
		Optional<SportsEventMapping> sportEvent = sportsEventMappingDao.findFirstByCompTypeOrderByEventIdDesc(compType);

		// If no event with same competition exist yet, start the sequence at 0
		if (!sportEvent.isPresent()) {
			switch (compType) {
			case Constants.API_SOURCE_COMP_TYPE_EPL:
				return BigInteger.valueOf(1000000L);
			case Constants.API_SOURCE_COMP_TYPE_LALIGA:
				return BigInteger.valueOf(2000000L);
			case Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA:
				return BigInteger.valueOf(3000000L);
			case Constants.API_SOURCE_COMP_TYPE_SERIE_A:
				return BigInteger.valueOf(4000000L);
			case Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE:
				return BigInteger.valueOf(5000000L);
			default:
				throw new IllegalArgumentException("Invalid competition type: " + compType);
			}
		}

		// Get the value of the highest event_id, add 1 and return it
		return sportEvent.get().getEventId().add(BigInteger.valueOf(1L));
	}

	public void updateCurrBetEvents(String compType, OddsApiResponse[] results) {
		Arrays.sort(results, Comparator.comparing(OddsApiResponse::getCommence_time,
				Comparator.nullsFirst(Comparator.naturalOrder())));

		// check for missing bet events in DB and insert them
		for (OddsApiResponse result : results) {
			String apiEventId = result.getId();

			List<SportsEventMapping> sportsEvent = sportsEventMappingDao.findByApiEventId(apiEventId);

			if (sportsEvent == null || sportsEvent.isEmpty()) {
				logger.info("id: {} does not exist in DB, inserting record into db.", apiEventId);

				try {
					Date startTime = convertCommenceTimeToDate(result.getCommence_time());

					List<Bookmaker> bookmakerList = result.getBookmakers();
					if (bookmakerList != null && !bookmakerList.isEmpty()) {
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

						BigInteger eventId = getSequenceValue(compType);

						// Create a new document for the bet event
						SportsEventMapping sportsEventMapping = new SportsEventMapping();
						sportsEventMapping.setEventId(eventId);
						sportsEventMapping.setApiEventId(apiEventId);
						sportsEventMapping.setCompType(compType);
						sportsEventMapping.setEventType(Constants.EVENT_TYPE_1X2);
						sportsEventMapping.setCommenceTime(startTime);
						sportsEventMapping.setHomeTeam(result.getHome_team());
						sportsEventMapping.setAwayTeam(result.getAway_team());
						sportsEventMapping.setHomeOdds(homeOdds);
						sportsEventMapping.setAwayOdds(awayOdds);
						sportsEventMapping.setDrawOdds(drawOdds);
						sportsEventMapping.setCompleted(Constants.FALSE);
						sportsEventMapping.setCreateDt(new Date());

						// Insert the new event into the mongo db table sports_event_mapping
						sportsEventMappingDao.save(sportsEventMapping);
						logger.info("Bet event with id: {}, mapped to: {} inserted into the collection.", apiEventId,
								eventId);
					}
				} catch (ParseException e) {
					logger.error("error parsing date ", e);
				} catch (Exception e) {
					logger.error("other exception while trying to insert new betting event", e);
				}
			}
		}
	}

	public Date convertCommenceTimeToDate(String dateString) throws ParseException {
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
