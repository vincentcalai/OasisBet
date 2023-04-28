package com.oasisbet.betting.odds.controller;

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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.BettingRestResponse;
import com.oasisbet.betting.odds.model.Bookmaker;
import com.oasisbet.betting.odds.model.H2HEventOdds;
import com.oasisbet.betting.odds.model.Market;
import com.oasisbet.betting.odds.model.OddsApiResponse;
import com.oasisbet.betting.odds.model.Outcome;
import com.oasisbet.betting.util.Constants;
import com.oasisbet.betting.util.EventIdGenerator;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/odds")
public class OddsController {

	Logger logger = LoggerFactory.getLogger(OddsController.class);

	@GetMapping(value = "/retrieveOdds")
	public BettingRestResponse retrieveOdds(@RequestParam("compType") String compType) {

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
		OddsApiResponse[] results = null;
		BettingRestResponse response = new BettingRestResponse();
		try {
			ResponseEntity<OddsApiResponse[]> responseEntity = restTemplate.getForEntity(uri, OddsApiResponse[].class);
			results = responseEntity.getBody();
//			results = mockOddsApiResponseArray();

			List<BetEvent> betEventList = new ArrayList<>();
			for (OddsApiResponse result : results) {
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
					H2HEventOdds h2hEventOdds = new H2HEventOdds(homeOdds, drawOdds, awayOdds);

					String dateString = result.getCommence_time();
					DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
					Date startTime = dateFormat.parse(dateString);

					// Convert to SG time - add 8 hours to the start time
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(startTime);

					calendar.add(Calendar.HOUR_OF_DAY, 8);
					startTime = calendar.getTime();

					String eventDesc = result.getHome_team() + " vs " + result.getAway_team();
					String competition = result.getSport_title();
					BetEvent event = new BetEvent(competition, eventDesc, startTime, h2hEventOdds);
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

			response.setBetEvent(betEventList);
			return response;
		} catch (RestClientException e) {
			logger.error("error retrieve response from the-odds-api.com", e);
			response.setStatusCode(1);
			response.setResultMessage(Constants.RETRIEVE_ODDS_API_EXCEPTION);
			return response;
		} catch (ParseException e) {
			logger.error("error parsing date ", e);
			response.setStatusCode(2);
			response.setResultMessage(Constants.DATE_PARSING_EXCEPTION);
			return response;
		}

	}

	public static OddsApiResponse[] mockOddsApiResponseArray() {

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
}
