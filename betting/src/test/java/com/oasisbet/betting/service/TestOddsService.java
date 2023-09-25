package com.oasisbet.betting.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.fixture.BettingFixture;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.service.OddsService;

@ExtendWith(MockitoExtension.class)
class TestOddsService extends TestBaseSetup {

	@Autowired
	private OddsService oddsService;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Test
	void testRetrieveBetEventByCompTypeCountIs3() {
		List<BetEvent> results = oddsService.retrieveBetEventByCompType("soccer_epl");
		assertEquals(3, results.size());
	}

	@Test
	void testRetrieveBetEventByCompTypeCheckTeamNameSuccess() {
		List<BetEvent> results = oddsService.retrieveBetEventByCompType("soccer_epl");
		String homeTeam1 = results.get(0).getTeamsDetails().getHomeTeam();
		String awayTeam1 = results.get(0).getTeamsDetails().getAwayTeam();
		String homeTeam2 = results.get(1).getTeamsDetails().getHomeTeam();
		String awayTeam2 = results.get(1).getTeamsDetails().getAwayTeam();
		String homeTeam3 = results.get(2).getTeamsDetails().getHomeTeam();
		String awayTeam3 = results.get(2).getTeamsDetails().getAwayTeam();

		assertEquals("Tottenham Hotspur", homeTeam1);
		assertEquals("Manchester United", awayTeam1);
		assertEquals("Southampton", homeTeam2);
		assertEquals("Bournemouth", awayTeam2);
		assertEquals("Everton", homeTeam3);
		assertEquals("Newcastle United", awayTeam3);
	}

	@Test
	void testRetrieveBetEventByCompTypeCheckOddsSuccess() {
		List<BetEvent> results = oddsService.retrieveBetEventByCompType("soccer_epl");
		double homeOdds1 = results.get(0).getH2hEventOdds().getHomeOdds();
		double drawOdds1 = results.get(0).getH2hEventOdds().getDrawOdds();
		double awayOdds1 = results.get(0).getH2hEventOdds().getAwayOdds();
		double homeOdds2 = results.get(1).getH2hEventOdds().getHomeOdds();
		double drawOdds2 = results.get(1).getH2hEventOdds().getDrawOdds();
		double awayOdds2 = results.get(1).getH2hEventOdds().getAwayOdds();
		double homeOdds3 = results.get(2).getH2hEventOdds().getHomeOdds();
		double drawOdds3 = results.get(2).getH2hEventOdds().getDrawOdds();
		double awayOdds3 = results.get(2).getH2hEventOdds().getAwayOdds();

		assertEquals(2.81, homeOdds1);
		assertEquals(3.71, drawOdds1);
		assertEquals(2.49, awayOdds1);
		assertEquals(2.32, homeOdds2);
		assertEquals(3.46, drawOdds2);
		assertEquals(3.25, awayOdds2);
		assertEquals(5.17, homeOdds3);
		assertEquals(3.85, drawOdds3);
		assertEquals(1.74, awayOdds3);
	}

	@Test
	void testRetrieveBetEventSequenceOfCommenceTimeSuccess() {
		List<BetEvent> results = oddsService.retrieveBetEventByCompType("soccer_epl");

		assertEquals(BigInteger.valueOf(1000000), results.get(0).getEventId());
		assertEquals(BigInteger.valueOf(1000001), results.get(1).getEventId());
		assertEquals(BigInteger.valueOf(1000002), results.get(2).getEventId());
	}

	@Test
	void testGetSequenceValueEplInitialValueIs1000000Success() {
		Query query = new Query();
		mongoTemplate.remove(query, "sports_event_mapping");

		BigInteger eventId = oddsService.getSequenceValue("soccer_epl");

		assertEquals(BigInteger.valueOf(1000000), eventId);
	}

	@Test
	void testGetSequenceValueLaLigaInitialValueIs2000000Success() {
		Query query = new Query();
		mongoTemplate.remove(query, "sports_event_mapping");

		BigInteger eventId = oddsService.getSequenceValue("soccer_spain_la_liga");

		assertEquals(BigInteger.valueOf(2000000), eventId);
	}

	@Test
	void testGetSequenceValueBundesligaInitialValueIs3000000Success() {
		Query query = new Query();
		mongoTemplate.remove(query, "sports_event_mapping");

		BigInteger eventId = oddsService.getSequenceValue("soccer_germany_bundesliga");

		assertEquals(BigInteger.valueOf(3000000), eventId);
	}

	@Test
	void testGetSequenceValueSeriaAInitialValueIs4000000Success() {
		Query query = new Query();
		mongoTemplate.remove(query, "sports_event_mapping");

		BigInteger eventId = oddsService.getSequenceValue("soccer_italy_serie_a");

		assertEquals(BigInteger.valueOf(4000000), eventId);
	}

	@Test
	void testGetSequenceValueLigueOneInitialValueIs5000000Success() {
		Query query = new Query();
		mongoTemplate.remove(query, "sports_event_mapping");

		BigInteger eventId = oddsService.getSequenceValue("soccer_france_ligue_one");

		assertEquals(BigInteger.valueOf(5000000), eventId);
	}

	@Test
	void testGetSequenceValueInvalidCompTypeFail() {
		Query query = new Query();
		mongoTemplate.remove(query, "sports_event_mapping");

		assertThrows(IllegalArgumentException.class, () -> {
			oddsService.getSequenceValue("invalid_comp_type");
		});
	}

	@Test
	void testGetSequenceValueEplNextValueIs1000003Success() {
		BigInteger eventId = oddsService.getSequenceValue("soccer_epl");

		assertEquals(BigInteger.valueOf(1000003), eventId);
	}

	@Test
	void testGetSequenceValueBundesligaNextValueIs3000003Success() {
		BigInteger eventId = oddsService.getSequenceValue("soccer_germany_bundesliga");

		assertEquals(BigInteger.valueOf(3000003), eventId);
	}

	@Test
	void testUpdateCurrBetEventsInsertSuccess() {
		OddsApiResponse[] results = BettingFixture.mockEplOddsApiResponseArray();
		oddsService.updateCurrBetEvents("soccer_epl", results);
		List<BetEvent> retrievedResult = oddsService.retrieveBetEventByCompType("soccer_epl");
		assertEquals(5, retrievedResult.size());
	}

	@Test
	void testUpdateCurrBetEventsInsertVerifyEventDescSuccess() {
		OddsApiResponse[] results = BettingFixture.mockEplOddsApiResponseArray();
		oddsService.updateCurrBetEvents("soccer_epl", results);
		List<BetEvent> retrievedBetEvents = oddsService.retrieveBetEventByCompType("soccer_epl");
		assertEquals("Tottenham Hotspur vs Manchester United", retrievedBetEvents.get(0).getEventDesc());
		assertEquals("Southampton vs Bournemouth", retrievedBetEvents.get(1).getEventDesc());
		assertEquals("Everton vs Newcastle United", retrievedBetEvents.get(2).getEventDesc());
		assertEquals("Manchester City vs Nottingham Forest", retrievedBetEvents.get(3).getEventDesc());
		assertEquals("Crystal Palace vs Fulham", retrievedBetEvents.get(4).getEventDesc());
	}

	@Test
	void testUpdateCurrBetEventsInsertVerifyEventOddsSuccess() {
		OddsApiResponse[] results = BettingFixture.mockEplOddsApiResponseArray();
		oddsService.updateCurrBetEvents("soccer_epl", results);
		List<BetEvent> retrievedBetEvents = oddsService.retrieveBetEventByCompType("soccer_epl");
		assertEquals(2.81, retrievedBetEvents.get(0).getH2hEventOdds().getHomeOdds());
		assertEquals(2.49, retrievedBetEvents.get(0).getH2hEventOdds().getAwayOdds());
		assertEquals(3.71, retrievedBetEvents.get(0).getH2hEventOdds().getDrawOdds());
		assertEquals(2.32, retrievedBetEvents.get(1).getH2hEventOdds().getHomeOdds());
		assertEquals(3.25, retrievedBetEvents.get(1).getH2hEventOdds().getAwayOdds());
		assertEquals(3.46, retrievedBetEvents.get(1).getH2hEventOdds().getDrawOdds());
		assertEquals(5.17, retrievedBetEvents.get(2).getH2hEventOdds().getHomeOdds());
		assertEquals(1.74, retrievedBetEvents.get(2).getH2hEventOdds().getAwayOdds());
		assertEquals(3.85, retrievedBetEvents.get(2).getH2hEventOdds().getDrawOdds());
		assertEquals(1.15, retrievedBetEvents.get(3).getH2hEventOdds().getHomeOdds());
		assertEquals(15.55, retrievedBetEvents.get(3).getH2hEventOdds().getAwayOdds());
		assertEquals(6.80, retrievedBetEvents.get(3).getH2hEventOdds().getDrawOdds());
		assertEquals(2.00, retrievedBetEvents.get(4).getH2hEventOdds().getHomeOdds());
		assertEquals(3.05, retrievedBetEvents.get(4).getH2hEventOdds().getAwayOdds());
		assertEquals(3.50, retrievedBetEvents.get(4).getH2hEventOdds().getDrawOdds());
	}

	@Test
	void testDateParseErrorVerifyNoInsert() {
		OddsApiResponse[] results = BettingFixture.mockDatePaseErrorEplOdds();
		oddsService.updateCurrBetEvents("soccer_epl", results);
		List<BetEvent> retrievedResult = oddsService.retrieveBetEventByCompType("soccer_epl");
		assertEquals(3, retrievedResult.size());
	}

	@Test
	void testConvertCommenceTimeToDateSuccess() throws ParseException {
		String dateString = "2023-09-16T11:32:09Z";

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		Date expectedDate = dateFormat.parse("2023-09-16T19:32:09Z");

		Date resultDate = oddsService.convertCommenceTimeToDate(dateString);

		assertEquals(expectedDate, resultDate);
	}

	@Test
	void testConvertCommenceTimeToDateFail() throws ParseException {
		String invalidDateString = "invalid-date";
		assertThrows(ParseException.class, () -> {
			oddsService.convertCommenceTimeToDate(invalidDateString);
		});
	}
}
