package com.oasisbet.result.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultRestResponse;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/result")
public class ResultController {

	Logger logger = LoggerFactory.getLogger(ResultController.class);

	@GetMapping(value = "/retrieveResult")
	public ResultRestResponse retrieveResult(@RequestParam("compType") String compType) {

//		String baseUri = Constants.API_SOURCE_BASE_URI;
//		String uri = baseUri + compType + Constants.API_SOURCE_URI_ODDS + Constants.API_SOURCE_URI_API_KEY_PARAM
//				+ Constants.API_SOURCE_API_KEY + Constants.AMPERSAND + Constants.API_SOURCE_URI_REGION_PARAM
//				+ Constants.API_SOURCE_URI_EU_REGION + Constants.AMPERSAND + Constants.API_SOURCE_URI_MARKET_PARAM
//				+ Constants.API_SOURCE_URI_MARKET_H2H + Constants.AMPERSAND + Constants.API_SOURCE_URI_DATE_FORMAT_PARAM
//				+ Constants.API_SOURCE_URI_DATE_FORMAT_ISO + Constants.AMPERSAND
//				+ Constants.API_SOURCE_URI_ODDS_FORMAT_PARAM + Constants.API_SOURCE_URI_ODDS_FORMAT_DEC
//				+ Constants.AMPERSAND + Constants.API_SOURCE_URI_BOOKMKR_PARAM
//				+ Constants.API_SOURCE_URI_BOOKMKR_PINNACLE;
		RestTemplate restTemplate = new RestTemplate();
		ResultApiResponse[] results = null;
		ResultRestResponse response = new ResultRestResponse();
//		try {
//			ResponseEntity<OddsApiResponse[]> responseEntity = restTemplate.getForEntity(uri, OddsApiResponse[].class);
//			results = responseEntity.getBody();
////			results = mockOddsApiResponseArray();
//
//			List<BetEvent> betEventList = new ArrayList<>();
//			for (OddsApiResponse result : results) {
//				List<Bookmaker> bookmakerList = result.getBookmakers();
//				if (bookmakerList != null && bookmakerList.size() > 0) {
//					Bookmaker bookmaker = bookmakerList.get(0);
//					List<Market> marketList = bookmaker.getMarkets();
//					Market market = marketList.get(0);
//					List<Outcome> outcomeList = market.getOutcomes();
//					Outcome homeOutcome = outcomeList.get(0).getName().equals(result.getHome_team())
//							? outcomeList.get(0)
//							: outcomeList.get(1);
//					Outcome awayOutcome = outcomeList.get(1).getName().equals(result.getAway_team())
//							? outcomeList.get(1)
//							: outcomeList.get(0);
//					Outcome drawOutcome = outcomeList.get(2);
//					double homeOdds = homeOutcome.getPrice();
//					double awayOdds = awayOutcome.getPrice();
//					double drawOdds = drawOutcome.getPrice();
//					H2HEventOdds h2hEventOdds = new H2HEventOdds(homeOdds, drawOdds, awayOdds);
//
//					String dateString = result.getCommence_time();
//					DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
//					Date startTime = dateFormat.parse(dateString);
//
//					// Convert to SG time - add 8 hours to the start time
//					Calendar calendar = Calendar.getInstance();
//					calendar.setTime(startTime);
//
//					calendar.add(Calendar.HOUR_OF_DAY, 8);
//					startTime = calendar.getTime();
//
//					String eventDesc = result.getHome_team() + " vs " + result.getAway_team();
//					String competition = result.getSport_title();
//					BetEvent event = new BetEvent(competition, eventDesc, startTime, h2hEventOdds);
//					betEventList.add(event);
//				}
//			}
//
//			betEventList = betEventList.stream().sorted(Comparator.comparing(BetEvent::getStartTime)).map(event -> {
//				long eventId = EventIdGenerator.nextId();
//				event.setEventId(eventId);
//				H2HEventOdds h2hEventOdds = event.getH2hEventOdds();
//				h2hEventOdds.setEventId(eventId);
//				event.setH2hEventOdds(h2hEventOdds);
//				return event;
//			}).collect(Collectors.toList());
//
//			response.setBetEvent(betEventList);
//			return response;
//		} catch (RestClientException e) {
//			logger.error("error retrieve response from the-odds-api.com", e);
//			response.setStatusCode(1);
//			response.setResultMessage(Constants.RETRIEVE_ODDS_API_EXCEPTION);
//			return response;
//		} catch (ParseException e) {
//			logger.error("error parsing date ", e);
//			response.setStatusCode(2);
//			response.setResultMessage(Constants.DATE_PARSING_EXCEPTION);
//			return response;
//		}
		return response;

	}

}
