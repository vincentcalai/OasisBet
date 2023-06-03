package com.oasisbet.betting.util;

import java.util.Arrays;
import java.util.List;

import com.oasisbet.betting.odds.model.Bookmaker;
import com.oasisbet.betting.odds.model.Market;
import com.oasisbet.betting.odds.model.Outcome;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;

public class MockData {

	public static OddsApiResponse[] mockEplOddsApiResponseArray() {

		OddsApiResponse[] array = new OddsApiResponse[3];

		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("a085aa8beb661722ad957e5d8c15f798");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("EPL");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
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
		mockResponse2.setCommence_time("2023-04-29T20:45:00Z");
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
		mockResponse3.setCommence_time("2023-04-27T19:15:00Z");
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

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;
		return array;
	}

	public static OddsApiResponse[] mockSpainLaLigaOddsApiResponseArray() {
		OddsApiResponse[] array = new OddsApiResponse[2];

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

		array[0] = mockResponse1;
		array[1] = mockResponse2;

		return array;
	}
}
