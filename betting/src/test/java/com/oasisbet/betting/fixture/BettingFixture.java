package com.oasisbet.betting.fixture;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.BetSubmissionVO;
import com.oasisbet.betting.odds.model.Bookmaker;
import com.oasisbet.betting.odds.model.H2HEventOdds;
import com.oasisbet.betting.odds.model.Market;
import com.oasisbet.betting.odds.model.Outcome;
import com.oasisbet.betting.odds.model.TeamsDetails;
import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;

public class BettingFixture {
	public static BetSlipRest createMockBetSubmissionData() {
		BetSlipRest betsInput = new BetSlipRest();
		betsInput.setUserId(22L);
		List<BetSubmissionVO> betSubmissionVOlist = new ArrayList<>();
		BetSubmissionVO betSubmission = new BetSubmissionVO();
		betSubmission.setEventId(1000001L);
		betSubmission.setBetAmount(1.00);
		betSubmission.setBetSelection("01");
		betSubmission.setBetSelectionName("Manchester United");
		betSubmission.setBetTypeCd("01");
		betSubmission.setCompType("soccer_epl");
		betSubmission.setEventDesc("Manchester City vs Manchester United");
		betSubmission.setOdds(4.05);
		betSubmission.setPotentialPayout(4.05);
		betSubmission.setStartTime(new Date());
		betSubmissionVOlist.add(betSubmission);
		betsInput.setBetSlip(betSubmissionVOlist);
		return betsInput;
	}

	public static List<BetEvent> createMockOddsData() {
		TeamsDetails teamDetails1 = new TeamsDetails("Manchester City", "Manchester United");
		H2HEventOdds eventOdds1 = new H2HEventOdds(1.65, 3.80, 6.55);
		eventOdds1.setEventId(BigInteger.valueOf(1000000L));
		BetEvent betEvent1 = new BetEvent("English Premier League", "Manchester City vs Manchester United", new Date(),
				teamDetails1, eventOdds1);
		betEvent1.setEventId(BigInteger.valueOf(1000000L));

		TeamsDetails teamDetails2 = new TeamsDetails("Chelsea", "Liverpool");
		H2HEventOdds eventOdds2 = new H2HEventOdds(2.65, 3.20, 2.52);
		eventOdds2.setEventId(BigInteger.valueOf(1000001L));
		BetEvent betEvent2 = new BetEvent("English Premier League", "Chelsea vs Liverpool", new Date(), teamDetails2,
				eventOdds2);
		betEvent1.setEventId(BigInteger.valueOf(1000001L));

		TeamsDetails teamDetails3 = new TeamsDetails("Arsenal", "Luton Town");
		H2HEventOdds eventOdds3 = new H2HEventOdds(1.15, 6.5, 15.00);
		eventOdds3.setEventId(BigInteger.valueOf(1000002L));
		BetEvent betEvent3 = new BetEvent("English Premier League", "Arsenal vs Luton Town", new Date(), teamDetails3,
				eventOdds3);
		betEvent1.setEventId(BigInteger.valueOf(1000002L));

		return Arrays.asList(betEvent1, betEvent2, betEvent3);
	}

	public static OddsApiResponse[] mockEplOddsApiResponseArray() {

		OddsApiResponse[] array = new OddsApiResponse[5];

		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("a085aa8beb661722ad957e5d8c15f798");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("EPL");
		mockResponse1.setCommence_time("2099-04-28T18:45:00Z");
		mockResponse1.setHome_team("Southampton");
		mockResponse1.setAway_team("Bournemouth");

		Bookmaker bookmaker = new Bookmaker();
		bookmaker.setKey("pinnacle");
		bookmaker.setTitle("Pinnacle");
		bookmaker.setLast_update("2023-04-27T06:27:40Z");

		Market market = new Market();
		market.setKey("h2h");
		market.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome1 = new Outcome();
		outcome1.setName("Bournemouth");
		outcome1.setPrice(3.25);

		Outcome outcome2 = new Outcome();
		outcome2.setName("Southampton");
		outcome2.setPrice(2.32);

		Outcome outcome3 = new Outcome();
		outcome3.setName("Draw");
		outcome3.setPrice(3.46);

		List<Outcome> outcomeList = Arrays.asList(outcome1, outcome2, outcome3);
		market.setOutcomes(outcomeList);

		List<Market> marketList = Arrays.asList(market);

		bookmaker.setMarkets(marketList);

		List<Bookmaker> bookmakerList = Arrays.asList(bookmaker);

		mockResponse1.setBookmakers(bookmakerList);

		OddsApiResponse mockResponse2 = new OddsApiResponse();
		mockResponse2.setId("f7d5d5a141e21df15f23b5e306340bed");
		mockResponse2.setSport_key("soccer_epl");
		mockResponse2.setSport_title("EPL");
		mockResponse2.setCommence_time("2099-04-29T20:45:00Z");
		mockResponse2.setHome_team("Everton");
		mockResponse2.setAway_team("Newcastle United");

		Bookmaker bookmaker2 = new Bookmaker();
		bookmaker2.setKey("pinnacle");
		bookmaker2.setTitle("Pinnacle");
		bookmaker2.setLast_update("2023-04-27T06:27:40Z");

		Market market2 = new Market();
		market2.setKey("h2h");
		market2.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome4 = new Outcome();
		outcome4.setName("Everton");
		outcome4.setPrice(5.17);

		Outcome outcome5 = new Outcome();
		outcome5.setName("Newcastle United");
		outcome5.setPrice(1.74);

		Outcome outcome6 = new Outcome();
		outcome6.setName("Draw");
		outcome6.setPrice(3.85);

		List<Outcome> outcomeList2 = Arrays.asList(outcome4, outcome5, outcome6);
		market2.setOutcomes(outcomeList2);

		List<Market> marketList2 = Arrays.asList(market2);

		bookmaker2.setMarkets(marketList2);

		List<Bookmaker> bookmakerList2 = Arrays.asList(bookmaker2);

		mockResponse2.setBookmakers(bookmakerList2);

		OddsApiResponse mockResponse3 = new OddsApiResponse();
		mockResponse3.setId("66ca5a121b5ddc4763cf1708222be377");
		mockResponse3.setSport_key("soccer_epl");
		mockResponse3.setSport_title("EPL");
		mockResponse3.setCommence_time("2099-04-27T19:15:00Z");
		mockResponse3.setHome_team("Tottenham Hotspur");
		mockResponse3.setAway_team("Manchester United");

		Bookmaker bookmaker3 = new Bookmaker();
		bookmaker3.setKey("pinnacle");
		bookmaker3.setTitle("Pinnacle");
		bookmaker3.setLast_update("2023-04-27T06:27:40Z");

		Market market3 = new Market();
		market3.setKey("h2h");
		market3.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome7 = new Outcome();
		outcome7.setName("Tottenham Hotspur");
		outcome7.setPrice(2.81);

		Outcome outcome8 = new Outcome();
		outcome8.setName("Manchester United");
		outcome8.setPrice(2.49);

		Outcome outcome9 = new Outcome();
		outcome9.setName("Draw");
		outcome9.setPrice(3.71);

		List<Outcome> outcomeList3 = Arrays.asList(outcome7, outcome8, outcome9);
		market3.setOutcomes(outcomeList3);

		List<Market> marketList3 = Arrays.asList(market3);

		bookmaker3.setMarkets(marketList3);

		List<Bookmaker> bookmakerList3 = Arrays.asList(bookmaker3);

		mockResponse3.setBookmakers(bookmakerList3);

		OddsApiResponse mockResponse4 = new OddsApiResponse();
		mockResponse4.setId("0ba40aad3c918f52363117a71f5de8e8");
		mockResponse4.setSport_key("soccer_epl");
		mockResponse4.setSport_title("EPL");
		mockResponse4.setCommence_time("2099-04-30T18:45:00Z");
		mockResponse4.setHome_team("Manchester City");
		mockResponse4.setAway_team("Nottingham Forest");

		Bookmaker bookmaker4 = new Bookmaker();
		bookmaker4.setKey("pinnacle");
		bookmaker4.setTitle("Pinnacle");
		bookmaker4.setLast_update("2023-04-29T06:27:40Z");

		Market market4 = new Market();
		market4.setKey("h2h");
		market4.setLast_update("2023-04-29T06:27:40Z");

		Outcome outcome10 = new Outcome();
		outcome10.setName("Nottingham Forest");
		outcome10.setPrice(15.55);

		Outcome outcome11 = new Outcome();
		outcome11.setName("Manchester City");
		outcome11.setPrice(1.15);

		Outcome outcome12 = new Outcome();
		outcome12.setName("Draw");
		outcome12.setPrice(6.80);

		List<Outcome> outcomeList4 = Arrays.asList(outcome10, outcome11, outcome12);
		market4.setOutcomes(outcomeList4);

		List<Market> marketList4 = Arrays.asList(market4);

		bookmaker4.setMarkets(marketList4);

		List<Bookmaker> bookmakerList4 = Arrays.asList(bookmaker4);

		mockResponse4.setBookmakers(bookmakerList4);

		OddsApiResponse mockResponse5 = new OddsApiResponse();
		mockResponse5.setId("69ce6c2d85c6731d5d04a2181043ac9a");
		mockResponse5.setSport_key("soccer_epl");
		mockResponse5.setSport_title("EPL");
		mockResponse5.setCommence_time("2099-04-30T20:45:00Z");
		mockResponse5.setHome_team("Crystal Palace");
		mockResponse5.setAway_team("Fulham");

		Bookmaker bookmaker5 = new Bookmaker();
		bookmaker5.setKey("pinnacle");
		bookmaker5.setTitle("Pinnacle");
		bookmaker5.setLast_update("2023-04-29T06:27:40Z");

		Market market5 = new Market();
		market5.setKey("h2h");
		market5.setLast_update("2023-04-29T06:27:40Z");

		Outcome outcome13 = new Outcome();
		outcome13.setName("Crystal Palace");
		outcome13.setPrice(2.00);

		Outcome outcome14 = new Outcome();
		outcome14.setName("Fulham");
		outcome14.setPrice(3.05);

		Outcome outcome15 = new Outcome();
		outcome15.setName("Draw");
		outcome15.setPrice(3.50);

		List<Outcome> outcomeList5 = Arrays.asList(outcome13, outcome14, outcome15);
		market5.setOutcomes(outcomeList5);

		List<Market> marketList5 = Arrays.asList(market5);

		bookmaker5.setMarkets(marketList5);

		List<Bookmaker> bookmakerList5 = Arrays.asList(bookmaker5);

		mockResponse5.setBookmakers(bookmakerList5);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;
		array[3] = mockResponse4;
		array[4] = mockResponse5;
		return array;
	}

	public static OddsApiResponse[] mockLaLigaOddsApiResponseArray() {
		OddsApiResponse[] array = new OddsApiResponse[3];
		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("d4e3a23b451b0c26782e4f5e7d8f9321");
		mockResponse1.setSport_key("soccer_laliga");
		mockResponse1.setSport_title("La Liga");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Real Madrid");
		mockResponse1.setAway_team("Barcelona");

		Bookmaker bookmaker1 = new Bookmaker();
		bookmaker1.setKey("pinnacle");
		bookmaker1.setTitle("Pinnacle");
		bookmaker1.setLast_update("2023-04-27T06:27:40Z");

		Market market1 = new Market();
		market1.setKey("h2h");
		market1.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome1 = new Outcome();
		outcome1.setName("Real Madrid");
		outcome1.setPrice(1.85);

		Outcome outcome2 = new Outcome();
		outcome2.setName("Barcelona");
		outcome2.setPrice(2.15);

		Outcome outcome3 = new Outcome();
		outcome3.setName("Draw");
		outcome3.setPrice(3.25);

		List<Outcome> outcomeList1 = Arrays.asList(outcome1, outcome2, outcome3);
		market1.setOutcomes(outcomeList1);

		List<Market> marketList1 = Arrays.asList(market1);

		bookmaker1.setMarkets(marketList1);

		List<Bookmaker> bookmakerList1 = Arrays.asList(bookmaker1);

		mockResponse1.setBookmakers(bookmakerList1);

		OddsApiResponse mockResponse2 = new OddsApiResponse();
		mockResponse2.setId("8f2b58e32b1c4d10d9e6718214a5246d");
		mockResponse2.setSport_key("soccer_laliga");
		mockResponse2.setSport_title("La Liga");
		mockResponse2.setCommence_time("2023-04-29T20:45:00Z");
		mockResponse2.setHome_team("Valencia");
		mockResponse2.setAway_team("Sevilla");

		Bookmaker bookmaker2 = new Bookmaker();
		bookmaker2.setKey("pinnacle");
		bookmaker2.setTitle("Pinnacle");
		bookmaker2.setLast_update("2023-04-27T06:27:40Z");

		Market market2 = new Market();
		market2.setKey("h2h");
		market2.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome4 = new Outcome();
		outcome4.setName("Valencia");
		outcome4.setPrice(2.35);

		Outcome outcome5 = new Outcome();
		outcome5.setName("Sevilla");
		outcome5.setPrice(2.85);

		Outcome outcome6 = new Outcome();
		outcome6.setName("Draw");
		outcome6.setPrice(3.64);

		List<Outcome> outcomeList2 = Arrays.asList(outcome4, outcome5, outcome6);
		market2.setOutcomes(outcomeList2);

		List<Market> marketList2 = Arrays.asList(market2);

		bookmaker2.setMarkets(marketList2);

		List<Bookmaker> bookmakerList2 = Arrays.asList(bookmaker2);

		mockResponse2.setBookmakers(bookmakerList2);

		OddsApiResponse mockResponse3 = new OddsApiResponse();
		mockResponse3.setId("4ad1e71603e51a092558022eefa20bbc");
		mockResponse3.setSport_key("soccer_laliga");
		mockResponse3.setSport_title("La Liga");
		mockResponse3.setCommence_time("2023-04-27T18:45:00Z");
		mockResponse3.setHome_team("Villarreal CF");
		mockResponse3.setAway_team("Atlético de Madrid");

		Bookmaker bookmaker3 = new Bookmaker();
		bookmaker3.setKey("pinnacle");
		bookmaker3.setTitle("Pinnacle");
		bookmaker3.setLast_update("2023-04-26T18:45:00Z");

		Market market3 = new Market();
		market3.setKey("h2h");
		market3.setLast_update("2023-04-26T18:45:00Z");

		Outcome outcome7 = new Outcome();
		outcome7.setName("Villarreal CF");
		outcome7.setPrice(3.45);

		Outcome outcome8 = new Outcome();
		outcome8.setName("Atlético de Madrid");
		outcome8.setPrice(1.87);

		Outcome outcome9 = new Outcome();
		outcome9.setName("Draw");
		outcome9.setPrice(3.35);

		List<Outcome> outcomeList3 = Arrays.asList(outcome7, outcome8, outcome9);
		market3.setOutcomes(outcomeList3);

		List<Market> marketList3 = Arrays.asList(market3);

		bookmaker3.setMarkets(marketList3);

		List<Bookmaker> bookmakerList3 = Arrays.asList(bookmaker3);

		mockResponse3.setBookmakers(bookmakerList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static OddsApiResponse[] mockBundesligaOddsApiResponseArray() {
		OddsApiResponse[] array = new OddsApiResponse[3];

		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("74c9ae71b731a5e2bc7631ff0dca54e9");
		mockResponse1.setSport_key("soccer_germany_bundesliga");
		mockResponse1.setSport_title("Bundesliga");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Bayern Munich");
		mockResponse1.setAway_team("VfL Wolfsburg");

		Bookmaker bookmaker1 = new Bookmaker();
		bookmaker1.setKey("pinnacle");
		bookmaker1.setTitle("Pinnacle");
		bookmaker1.setLast_update("2023-04-27T06:27:40Z");

		Market market1 = new Market();
		market1.setKey("h2h");
		market1.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome1 = new Outcome();
		outcome1.setName("Bayern Munich");
		outcome1.setPrice(1.15);

		Outcome outcome2 = new Outcome();
		outcome2.setName("VfL Wolfsburg");
		outcome2.setPrice(10.05);

		Outcome outcome3 = new Outcome();
		outcome3.setName("Draw");
		outcome3.setPrice(5.65);

		List<Outcome> outcomeList1 = Arrays.asList(outcome1, outcome2, outcome3);
		market1.setOutcomes(outcomeList1);

		List<Market> marketList1 = Arrays.asList(market1);

		bookmaker1.setMarkets(marketList1);

		List<Bookmaker> bookmakerList1 = Arrays.asList(bookmaker1);

		mockResponse1.setBookmakers(bookmakerList1);

		OddsApiResponse mockResponse2 = new OddsApiResponse();
		mockResponse2.setId("8f26dbb905e61d37a2c84c9428b1e98f");
		mockResponse2.setSport_key("soccer_germany_bundesliga");
		mockResponse2.setSport_title("Bundesliga");
		mockResponse2.setCommence_time("2023-04-30T19:15:00Z");
		mockResponse2.setHome_team("Bayer 04 Leverkusen");
		mockResponse2.setAway_team("Hertha Berlin");

		Bookmaker bookmaker2 = new Bookmaker();
		bookmaker2.setKey("pinnacle");
		bookmaker2.setTitle("Pinnacle");
		bookmaker2.setLast_update("2023-04-27T06:27:40Z");

		Market market2 = new Market();
		market2.setKey("h2h");
		market2.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome4 = new Outcome();
		outcome4.setName("Bayer 04 Leverkusen");
		outcome4.setPrice(2.63);

		Outcome outcome5 = new Outcome();
		outcome5.setName("Hertha Berlin");
		outcome5.setPrice(2.97);

		Outcome outcome6 = new Outcome();
		outcome6.setName("Draw");
		outcome6.setPrice(3.32);

		List<Outcome> outcomeList2 = Arrays.asList(outcome4, outcome5, outcome6);
		market2.setOutcomes(outcomeList2);

		List<Market> marketList2 = Arrays.asList(market2);

		bookmaker2.setMarkets(marketList2);

		List<Bookmaker> bookmakerList2 = Arrays.asList(bookmaker2);

		mockResponse2.setBookmakers(bookmakerList2);

		OddsApiResponse mockResponse3 = new OddsApiResponse();
		mockResponse3.setId("6bfc7d4b024f39859f731e739e9e9fe2");
		mockResponse3.setSport_key("soccer_germany_bundesliga");
		mockResponse3.setSport_title("Bundesliga");
		mockResponse3.setCommence_time("2023-04-26T20:45:00Z");
		mockResponse3.setHome_team("RB Leipzig");
		mockResponse3.setAway_team("Borussia Dortmund");

		Bookmaker bookmaker3 = new Bookmaker();
		bookmaker3.setKey("pinnacle");
		bookmaker3.setTitle("Pinnacle");
		bookmaker3.setLast_update("2023-04-27T06:27:40Z");

		Market market3 = new Market();
		market3.setKey("h2h");
		market3.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome7 = new Outcome();
		outcome7.setName("Valencia");
		outcome7.setPrice(2.35);

		Outcome outcome8 = new Outcome();
		outcome8.setName("Sevilla");
		outcome8.setPrice(2.85);

		Outcome outcome9 = new Outcome();
		outcome9.setName("Draw");
		outcome9.setPrice(3.64);

		List<Outcome> outcomeList3 = Arrays.asList(outcome7, outcome8, outcome9);
		market3.setOutcomes(outcomeList3);

		List<Market> marketList3 = Arrays.asList(market3);

		bookmaker3.setMarkets(marketList3);

		List<Bookmaker> bookmakerList3 = Arrays.asList(bookmaker3);

		mockResponse3.setBookmakers(bookmakerList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static OddsApiResponse[] mockSerieAOddsApiResponseArray() {
		OddsApiResponse[] array = new OddsApiResponse[3];

		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("d67985c60227e89deabf406c0f2af616");
		mockResponse1.setSport_key("soccer_italy_serie_a");
		mockResponse1.setSport_title("Serie A");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("A.S. Roma");
		mockResponse1.setAway_team("Napoli");

		Bookmaker bookmaker1 = new Bookmaker();
		bookmaker1.setKey("pinnacle");
		bookmaker1.setTitle("Pinnacle");
		bookmaker1.setLast_update("2023-04-27T06:27:40Z");

		Market market1 = new Market();
		market1.setKey("h2h");
		market1.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome1 = new Outcome();
		outcome1.setName("A.S. Roma");
		outcome1.setPrice(2.25);

		Outcome outcome2 = new Outcome();
		outcome2.setName("Napoli");
		outcome2.setPrice(2.85);

		Outcome outcome3 = new Outcome();
		outcome3.setName("Draw");
		outcome3.setPrice(3.65);

		List<Outcome> outcomeList1 = Arrays.asList(outcome1, outcome2, outcome3);
		market1.setOutcomes(outcomeList1);

		List<Market> marketList1 = Arrays.asList(market1);

		bookmaker1.setMarkets(marketList1);

		List<Bookmaker> bookmakerList1 = Arrays.asList(bookmaker1);

		mockResponse1.setBookmakers(bookmakerList1);

		OddsApiResponse mockResponse2 = new OddsApiResponse();
		mockResponse2.setId("f3e32c2929d70533b2110a147b0c2858");
		mockResponse2.setSport_key("soccer_italy_serie_a");
		mockResponse2.setSport_title("Serie A");
		mockResponse2.setCommence_time("2023-04-30T19:15:00Z");
		mockResponse2.setHome_team("Juventus");
		mockResponse2.setAway_team("AC Milan");

		Bookmaker bookmaker2 = new Bookmaker();
		bookmaker2.setKey("pinnacle");
		bookmaker2.setTitle("Pinnacle");
		bookmaker2.setLast_update("2023-04-27T06:27:40Z");

		Market market2 = new Market();
		market2.setKey("h2h");
		market2.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome4 = new Outcome();
		outcome4.setName("Juventus");
		outcome4.setPrice(2.52);

		Outcome outcome5 = new Outcome();
		outcome5.setName("AC Milan");
		outcome5.setPrice(2.45);

		Outcome outcome6 = new Outcome();
		outcome6.setName("Draw");
		outcome6.setPrice(3.20);

		List<Outcome> outcomeList2 = Arrays.asList(outcome4, outcome5, outcome6);
		market2.setOutcomes(outcomeList2);

		List<Market> marketList2 = Arrays.asList(market2);

		bookmaker2.setMarkets(marketList2);

		List<Bookmaker> bookmakerList2 = Arrays.asList(bookmaker2);

		mockResponse2.setBookmakers(bookmakerList2);

		OddsApiResponse mockResponse3 = new OddsApiResponse();
		mockResponse3.setId("c4899d1a8129766fd5274de2c9b3a75b");
		mockResponse3.setSport_key("soccer_italy_serie_a");
		mockResponse3.setSport_title("Serie A");
		mockResponse3.setCommence_time("2023-04-26T20:45:00Z");
		mockResponse3.setHome_team("Inter Milan");
		mockResponse3.setAway_team("Fiorentina");

		Bookmaker bookmaker3 = new Bookmaker();
		bookmaker3.setKey("pinnacle");
		bookmaker3.setTitle("Pinnacle");
		bookmaker3.setLast_update("2023-04-27T06:27:40Z");

		Market market3 = new Market();
		market3.setKey("h2h");
		market3.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome7 = new Outcome();
		outcome7.setName("Inter Milan");
		outcome7.setPrice(1.45);

		Outcome outcome8 = new Outcome();
		outcome8.setName("Fiorentina");
		outcome8.setPrice(6.85);

		Outcome outcome9 = new Outcome();
		outcome9.setName("Draw");
		outcome9.setPrice(4.88);

		List<Outcome> outcomeList3 = Arrays.asList(outcome7, outcome8, outcome9);
		market3.setOutcomes(outcomeList3);

		List<Market> marketList3 = Arrays.asList(market3);

		bookmaker3.setMarkets(marketList3);

		List<Bookmaker> bookmakerList3 = Arrays.asList(bookmaker3);

		mockResponse3.setBookmakers(bookmakerList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static OddsApiResponse[] mockLigueOneOddsApiResponseArray() {
		OddsApiResponse[] array = new OddsApiResponse[3];

		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("4d7e79c8f19a620caea24c05ebdce377");
		mockResponse1.setSport_key("soccer_france_ligue_one");
		mockResponse1.setSport_title("Ligue One");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Paris Saint-Germain");
		mockResponse1.setAway_team("Nice");

		Bookmaker bookmaker1 = new Bookmaker();
		bookmaker1.setKey("pinnacle");
		bookmaker1.setTitle("Pinnacle");
		bookmaker1.setLast_update("2023-04-27T06:27:40Z");

		Market market1 = new Market();
		market1.setKey("h2h");
		market1.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome1 = new Outcome();
		outcome1.setName("Paris Saint-Germain");
		outcome1.setPrice(1.28);

		Outcome outcome2 = new Outcome();
		outcome2.setName("Nice");
		outcome2.setPrice(12.62);

		Outcome outcome3 = new Outcome();
		outcome3.setName("Draw");
		outcome3.setPrice(6.85);

		List<Outcome> outcomeList1 = Arrays.asList(outcome1, outcome2, outcome3);
		market1.setOutcomes(outcomeList1);

		List<Market> marketList1 = Arrays.asList(market1);

		bookmaker1.setMarkets(marketList1);

		List<Bookmaker> bookmakerList1 = Arrays.asList(bookmaker1);

		mockResponse1.setBookmakers(bookmakerList1);

		OddsApiResponse mockResponse2 = new OddsApiResponse();
		mockResponse2.setId("a2e81b5f49a99cc20b58de1ad5ae98a6");
		mockResponse2.setSport_key("soccer_france_ligue_one");
		mockResponse2.setSport_title("Ligue One");
		mockResponse2.setCommence_time("2023-04-30T19:15:00Z");
		mockResponse2.setHome_team("Marseille");
		mockResponse2.setAway_team("Lyon");

		Bookmaker bookmaker2 = new Bookmaker();
		bookmaker2.setKey("pinnacle");
		bookmaker2.setTitle("Pinnacle");
		bookmaker2.setLast_update("2023-04-27T06:27:40Z");

		Market market2 = new Market();
		market2.setKey("h2h");
		market2.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome4 = new Outcome();
		outcome4.setName("Marseille");
		outcome4.setPrice(2.83);

		Outcome outcome5 = new Outcome();
		outcome5.setName("Lyon");
		outcome5.setPrice(2.36);

		Outcome outcome6 = new Outcome();
		outcome6.setName("Draw");
		outcome6.setPrice(3.50);

		List<Outcome> outcomeList2 = Arrays.asList(outcome4, outcome5, outcome6);
		market2.setOutcomes(outcomeList2);

		List<Market> marketList2 = Arrays.asList(market2);

		bookmaker2.setMarkets(marketList2);

		List<Bookmaker> bookmakerList2 = Arrays.asList(bookmaker2);

		mockResponse2.setBookmakers(bookmakerList2);

		OddsApiResponse mockResponse3 = new OddsApiResponse();
		mockResponse3.setId("20d0c5053a0914f753cb2fcf6f84416e");
		mockResponse3.setSport_key("soccer_france_ligue_one");
		mockResponse3.setSport_title("Ligue One");
		mockResponse3.setCommence_time("2023-04-26T20:45:00Z");
		mockResponse3.setHome_team("Lille");
		mockResponse3.setAway_team("AS Monaco");

		Bookmaker bookmaker3 = new Bookmaker();
		bookmaker3.setKey("pinnacle");
		bookmaker3.setTitle("Pinnacle");
		bookmaker3.setLast_update("2023-04-27T06:27:40Z");

		Market market3 = new Market();
		market3.setKey("h2h");
		market3.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome7 = new Outcome();
		outcome7.setName("Lille");
		outcome7.setPrice(1.88);

		Outcome outcome8 = new Outcome();
		outcome8.setName("AS Monaco");
		outcome8.setPrice(3.65);

		Outcome outcome9 = new Outcome();
		outcome9.setName("Draw");
		outcome9.setPrice(3.05);

		List<Outcome> outcomeList3 = Arrays.asList(outcome7, outcome8, outcome9);
		market3.setOutcomes(outcomeList3);

		List<Market> marketList3 = Arrays.asList(market3);

		bookmaker3.setMarkets(marketList3);

		List<Bookmaker> bookmakerList3 = Arrays.asList(bookmaker3);

		mockResponse3.setBookmakers(bookmakerList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static OddsApiResponse[] mockDatePaseErrorEplOdds() {
		OddsApiResponse[] array = new OddsApiResponse[1];

		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("74a747a8cd2ad057e7e1f432d608ce63");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("EPL");
		mockResponse1.setCommence_time("ERROR");
		mockResponse1.setHome_team("Cheslea");
		mockResponse1.setAway_team("Aston Villa");

		Bookmaker bookmaker = new Bookmaker();
		bookmaker.setKey("pinnacle");
		bookmaker.setTitle("Pinnacle");
		bookmaker.setLast_update("2023-04-27T06:27:40Z");

		Market market = new Market();
		market.setKey("h2h");
		market.setLast_update("2023-04-27T06:27:40Z");

		Outcome outcome1 = new Outcome();
		outcome1.setName("Cheslea");
		outcome1.setPrice(1.85);

		Outcome outcome2 = new Outcome();
		outcome2.setName("Aston Villa");
		outcome2.setPrice(3.85);

		Outcome outcome3 = new Outcome();
		outcome3.setName("Draw");
		outcome3.setPrice(3.35);

		List<Outcome> outcomeList = Arrays.asList(outcome1, outcome2, outcome3);
		market.setOutcomes(outcomeList);

		List<Market> marketList = Arrays.asList(market);

		bookmaker.setMarkets(marketList);

		List<Bookmaker> bookmakerList = Arrays.asList(bookmaker);

		mockResponse1.setBookmakers(bookmakerList);
		array[0] = mockResponse1;

		return array;
	}

}
