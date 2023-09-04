package com.oasisbet.betting.odds.controller;

import java.text.ParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.BettingRestResponse;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.model.response.StatusResponse;
import com.oasisbet.betting.odds.proxy.AccountProxy;
import com.oasisbet.betting.odds.service.OddsService;
import com.oasisbet.betting.odds.util.Constants;

@RestController
@RequestMapping(path = "/odds")
public class OddsController {

	Logger logger = LoggerFactory.getLogger(OddsController.class);

	@Autowired
	public OddsService oddsService;

	@Autowired
	private AccountProxy proxy;

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
//			if (compType.equals(Constants.API_SOURCE_COMP_TYPE_EPL)) {
//				results = MockData.mockEplOddsApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LALIGA)) {
//				results = MockData.mockLaLigaOddsApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA)) {
//				results = MockData.mockBundesligaOddsApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_SERIE_A)) {
//				results = MockData.mockSerieAOddsApiResponseArray();
//			} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE)) {
//				results = MockData.mockLigueOneOddsApiResponseArray();
//			}

			// sync new bet events to DB, create new event id for new bet events
			oddsService.syncAllBetEvents(compType, results);

			List<BetEvent> betEventList = oddsService.processMapping(results);

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

	@PostMapping(value = "/bets")
	public StatusResponse submitBet(@RequestBody BetSlipRest betsInput) {
		// Make the API call to the Account microservice using the Feign Client
		StatusResponse response = null;
		try {
			response = proxy.processBet(betsInput);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			response = new StatusResponse();
			response.setStatusCode(1);
			response.setResultMessage(Constants.BET_PROCESS_ERROR);
			logger.error("error while processing bet ", e);
		}
		return response;
	}

}
