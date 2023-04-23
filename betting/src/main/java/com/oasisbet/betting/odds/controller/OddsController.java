package com.oasisbet.betting.odds.controller;

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

import com.oasisbet.betting.odds.model.OddsApiResponse;
import com.oasisbet.betting.util.Constants;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/odds")
public class OddsController {

	Logger logger = LoggerFactory.getLogger(OddsController.class);

	@GetMapping(value = "/retrieveOdds")
	public ResponseEntity retrieveOdds(@RequestParam("compType") String compType) {

		String baseUri = Constants.API_SOURCE_BASE_URI;
		String uri = baseUri + compType + "a" + Constants.API_SOURCE_URI_ODDS + Constants.API_SOURCE_URI_API_KEY_PARAM
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
			ResponseEntity<OddsApiResponse[]> response = restTemplate.getForEntity(uri, OddsApiResponse[].class);
			result = response.getBody();
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch (RestClientException e) {
			logger.error("error retrieve response from the-odds-api.com", e);
			return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
		}

	}
}
