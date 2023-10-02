package com.oasisbet.result.util;

import java.math.BigInteger;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.result.dao.IResultEventMappingDao;
import com.oasisbet.result.dao.ISportsEventMappingDao;
import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.Score;
import com.oasisbet.result.model.SportsEventMapping;
import com.oasisbet.result.service.ResultService;

@Service
public class ResultUpdateJob implements Job {

	@Autowired
	ResultService resultService;

	@Autowired
	IResultEventMappingDao resultEventMappingDao;

	@Autowired
	ISportsEventMappingDao sportsEventMappingDao;

	@Autowired
	RestTemplate restTemplate;

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(ResultUpdateJob.class);

		log.info("executing ResultUpdateJob...");

		for (String compType : Constants.COMP_TYPE_LIST) {
			String baseUri = Constants.API_SOURCE_BASE_URI;
			String uri = baseUri + compType + Constants.API_SOURCE_URI_SCORES + Constants.API_SOURCE_URI_API_KEY_PARAM
					+ Constants.API_SOURCE_API_KEY + Constants.AMPERSAND + Constants.API_SOURCE_URI_DAYS_FROM_PARAM
					+ Constants.API_SOURCE_URI_DEFAULT_DAY;
			ResultApiResponse[] results = null;
			try {
				ResponseEntity<ResultApiResponse[]> responseEntity = restTemplate.getForEntity(uri,
						ResultApiResponse[].class);
				results = responseEntity.getBody();

//				if (compType.equals(Constants.API_SOURCE_COMP_TYPE_EPL)) {
//					results = MockData.mockEplResultApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LALIGA)) {
//					results = MockData.mockLaLigaOddsApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA)) {
//					results = MockData.mockBundesligaOddsApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_SERIE_A)) {
//					results = MockData.mockSerieAOddsApiResponseArray();
//				} else if (compType.equals(Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE)) {
//					results = MockData.mockLigueOneOddsApiResponseArray();
//				}

				for (ResultApiResponse result : results) {
					String apiEventId = result.getId();
					List<Score> scoreList = result.getScores();
					String homeScore = null;
					String awayScore = null;
					String finalScore = null;
					String outcomeResult = null;
					ResultEventMapping resultEvent = null;
					SportsEventMapping sportsEvent = null;
					if (scoreList != null && scoreList.size() == 2) {
						Map<String, String> homeAwayScoreMap = new HashMap<>();
						homeAwayScoreMap.put(scoreList.get(0).getName(), scoreList.get(0).getScore());
						homeAwayScoreMap.put(scoreList.get(1).getName(), scoreList.get(1).getScore());
						StringBuilder scoreSb = new StringBuilder();
						homeScore = homeAwayScoreMap.containsKey(result.getHome_team())
								? homeAwayScoreMap.get(result.getHome_team())
								: null;
						awayScore = homeAwayScoreMap.containsKey(result.getAway_team())
								? homeAwayScoreMap.get(result.getAway_team())
								: null;
						if (homeScore != null && awayScore != null) {
							finalScore = scoreSb.append(homeScore).append("-").append(awayScore).toString();
							outcomeResult = resultService.determineOutcome(homeScore, awayScore);
						}
					}

					List<ResultEventMapping> resultEventList = resultEventMappingDao.findByApiEventId(apiEventId);
					if (resultEventList != null && !resultEventList.isEmpty()) {
						resultEvent = resultEventList.get(0);
					}

					List<SportsEventMapping> sportsEventList = sportsEventMappingDao.findByApiEventId(apiEventId);
					if (sportsEventList != null && !sportsEventList.isEmpty()) {
						sportsEvent = sportsEventList.get(0);
					}

					if (resultEvent != null) {
						log.info("result event is found in db, api_event_id: {}", apiEventId);

						Boolean completed = false;
						boolean updateResultFlag = resultService.validateUpdateResultFlag(resultEvent);

						completed = resultEvent.isCompleted();
						// if event is completed - Update score, outcome, completed flag &
						// last_updated_dt
						if (!completed && updateResultFlag && (finalScore != null && !finalScore.isEmpty())
								&& outcomeResult != null) {
							resultEvent.setScore(finalScore);
							resultEvent.setLastUpdatedDt(new Date());
							resultEvent.setCompleted(Constants.TRUE);
							resultEvent.setOutcome(outcomeResult);
							resultEventMappingDao.save(resultEvent);

							// update sports_event_mapping that event has completed
							if (sportsEvent != null) {
								sportsEvent.setCompleted(Constants.TRUE);
								sportsEventMappingDao.save(sportsEvent);
							}
						}
					} else {
						log.info("result NOT found in db, api_event_id: {}", apiEventId);
						BigInteger eventId = null;
						// Get event ID from sports_event_mapping table
						if (sportsEvent != null) {
							eventId = sportsEvent.getEventId();
							boolean isEventCompleted = result.isCompleted();
							if (isEventCompleted) {
								sportsEvent.setCompleted(isEventCompleted);
								sportsEventMappingDao.save(sportsEvent);
							}

							// insert result into DB
							ResultEventMapping resultEventMapping = new ResultEventMapping();
							resultEventMapping.setEventId(eventId);
							resultEventMapping.setApiEventId(apiEventId);
							resultEventMapping.setCompType(result.getSport_key());
							resultEventMapping.setScore(finalScore);
							resultEventMapping.setOutcome(outcomeResult);
							resultEventMapping.setCompleted(isEventCompleted);
							resultEventMapping.setLastUpdatedDt(new Date());
							resultEventMappingDao.save(resultEventMapping);
							log.info("inserting new result event, api_event_id: {}", apiEventId);
						}
					}
				}

			} catch (RestClientException e) {
				log.error("error retrieve response from the-odds-api.com", e);
			}
		}
	}

}
