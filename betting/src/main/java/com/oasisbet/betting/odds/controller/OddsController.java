package com.oasisbet.betting.odds.controller;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.betting.odds.model.Bookmaker;
import com.oasisbet.betting.odds.model.Market;
import com.oasisbet.betting.odds.model.OddsApiResponse;
import com.oasisbet.betting.odds.model.Outcome;
import com.oasisbet.betting.util.Constants;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/odds")
public class OddsController {

	Logger logger = LoggerFactory.getLogger(OddsController.class);

	@GetMapping(value = "/retrieveOdds")
	public ResponseEntity retrieveOdds(@RequestParam("compType") String compType) {

		String baseUri = Constants.API_SOURCE_BASE_URI;
		String uri = baseUri + compType + Constants.API_SOURCE_URI_ODDS + Constants.API_SOURCE_URI_API_KEY_PARAM
				+ Constants.API_SOURCE_API_KEY + Constants.AMPERSAND + Constants.API_SOURCE_URI_REGION_PARAM
				+ Constants.API_SOURCE_URI_EU_REGION + Constants.AMPERSAND + Constants.API_SOURCE_URI_MARKET_PARAM
				+ Constants.API_SOURCE_URI_MARKET_H2H + Constants.AMPERSAND + Constants.API_SOURCE_URI_DATE_FORMAT_PARAM
				+ Constants.API_SOURCE_URI_DATE_FORMAT_ISO + Constants.AMPERSAND
				+ Constants.API_SOURCE_URI_ODDS_FORMAT_PARAM + Constants.API_SOURCE_URI_ODDS_FORMAT_DEC
				+ Constants.AMPERSAND + Constants.API_SOURCE_URI_BOOKMKR_PARAM
				+ Constants.API_SOURCE_URI_BOOKMKR_PINNACLE;
		RestTemplate restTemplate = new RestTemplate();
		OddsApiResponse[] result = null;
		try {
//			ResponseEntity<OddsApiResponse[]> response = restTemplate.getForEntity(uri, OddsApiResponse[].class);
//			result = response.getBody();
			result = mockOddsApiResponseArray();
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (RestClientException e) {
			logger.error("error retrieve response from the-odds-api.com", e);
			return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
		}

	}

	public static OddsApiResponse[] mockOddsApiResponseArray() {

		OddsApiResponse[] array = new OddsApiResponse[2];

		OddsApiResponse mockResponse1 = new OddsApiResponse();
		mockResponse1.setId("a085aa8beb661722ad957e5d8c15f798");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("EPL");
		mockResponse1.setCommence_time("2023-04-27T18:45:00Z");
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
		mockResponse2.setCommence_time("2023-04-27T18:45:00Z");
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

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		return array;
	}
}
