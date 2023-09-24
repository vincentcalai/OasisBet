package com.oasisbet.betting.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigInteger;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.fixture.BettingFixture;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.service.OddsService;

@ExtendWith(MockitoExtension.class)
class TestOddsService extends TestBaseSetup {

	@Autowired
	private OddsService oddsService;

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
		assertEquals(4, retrievedResult.size());
	}
}
