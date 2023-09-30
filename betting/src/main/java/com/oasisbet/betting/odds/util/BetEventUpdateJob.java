package com.oasisbet.betting.odds.util;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.service.OddsService;

@Service
public class BetEventUpdateJob implements Job {

	@Autowired
	private OddsService oddsService;

	@Autowired
	private RestTemplate restTemplate;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Logger log = LoggerFactory.getLogger(BetEventUpdateJob.class);

		log.info("executing BetEventUpdateJob...");

		for (String compType : Constants.API_SOURCE_COMP_TYPE_LIST) {
			String uri = Constants.API_SOURCE_BASE_URI + compType + Constants.API_SOURCE_URI_ODDS
					+ Constants.API_SOURCE_URI_API_KEY_PARAM + Constants.API_SOURCE_API_KEY + Constants.AMPERSAND
					+ Constants.API_SOURCE_URI_REGION_PARAM + Constants.API_SOURCE_URI_EU_REGION + Constants.AMPERSAND
					+ Constants.API_SOURCE_URI_MARKET_PARAM + Constants.API_SOURCE_URI_MARKET_H2H + Constants.AMPERSAND
					+ Constants.API_SOURCE_URI_DATE_FORMAT_PARAM + Constants.API_SOURCE_URI_DATE_FORMAT_ISO
					+ Constants.AMPERSAND + Constants.API_SOURCE_URI_ODDS_FORMAT_PARAM
					+ Constants.API_SOURCE_URI_ODDS_FORMAT_DEC + Constants.AMPERSAND
					+ Constants.API_SOURCE_URI_BOOKMKR_PARAM + Constants.API_SOURCE_URI_BOOKMKR_PINNACLE;
			OddsApiResponse[] results = null;
			try {
				ResponseEntity<OddsApiResponse[]> responseEntity = restTemplate.getForEntity(uri,
						OddsApiResponse[].class);
				results = responseEntity.getBody();
//				if (compType.equals(Constants.API_SOURCE_COMP_TYPE_EPL)) {
//					results = MockData.mockEplOddsApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LALIGA)) {
//					results = MockData.mockLaLigaOddsApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA)) {
//					results = MockData.mockBundesligaOddsApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_SERIE_A)) {
//					results = MockData.mockSerieAOddsApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE)) {
//					results = MockData.mockLigueOneOddsApiResponseArray();
//				}

				// add new bet events to sports_event_mapping, generate new event id for new bet
				// events
				oddsService.updateCurrBetEvents(compType, results);
			} catch (RestClientException e) {
				log.error("error retrieve response from the-odds-api.com", e);
			}

		}

	}

}