package com.oasisbet.result.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultRestResponse;
import com.oasisbet.result.model.Score;
import com.oasisbet.result.util.Constants;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/result")
public class ResultController {

	Logger logger = LoggerFactory.getLogger(ResultController.class);

	@GetMapping(value = "/retrieveResults")
	public ResultRestResponse retrieveResults(@RequestParam("compType") String compType) {

		String baseUri = Constants.API_SOURCE_BASE_URI;
		String uri = baseUri + compType + Constants.API_SOURCE_URI_SCORES + Constants.API_SOURCE_URI_API_KEY_PARAM
				+ Constants.API_SOURCE_API_KEY + Constants.AMPERSAND + Constants.API_SOURCE_URI_DAYS_FROM_PARAM
				+ Constants.API_SOURCE_URI_DEFAULT_DAY;
		RestTemplate restTemplate = new RestTemplate();
		ResultApiResponse[] results = null;
		ResultRestResponse response = new ResultRestResponse();
		try {
			ResponseEntity<ResultApiResponse[]> responseEntity = restTemplate.getForEntity(uri,
					ResultApiResponse[].class);
			results = responseEntity.getBody();
			List<ResultEvent> resultEventList = new ArrayList<>();
			for (ResultApiResponse result : results) {

				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
				String dateString = result.getCommence_time();
				Date startTime = dateFormat.parse(dateString);

				if (result.isCompleted()) {
					String lastUpdatedString = result.getLast_update();
					Date lastUpdated = lastUpdatedString != null ? dateFormat.parse(lastUpdatedString) : null;

					// Convert to SG time - add 8 hours to the start time
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(startTime);
					calendar.add(Calendar.HOUR_OF_DAY, 8);
					startTime = calendar.getTime();

					if (lastUpdated != null) {
						calendar.setTime(lastUpdated);
						calendar.add(Calendar.HOUR_OF_DAY, 8);
						lastUpdated = calendar.getTime();
					}

					String eventDesc = result.getHome_team() + " vs " + result.getAway_team();
					String competition = result.getSport_title();
					boolean completed = result.isCompleted();
					String homeTeam = result.getHome_team();
					String awayTeam = result.getAway_team();

					List<Score> scoreList = result.getScores();
					String score = "";
					if (scoreList != null && scoreList.size() > 1) {
						Score homeScore = scoreList.get(0).getName().equals(result.getHome_team()) ? scoreList.get(0)
								: scoreList.get(1);
						Score awayScore = scoreList.get(1).getName().equals(result.getAway_team()) ? scoreList.get(1)
								: scoreList.get(0);
						score = homeScore.getScore() + "-" + awayScore.getScore();
					}

					ResultEvent event = new ResultEvent(1000, competition, eventDesc, startTime, completed, homeTeam,
							awayTeam, score, lastUpdated);
					resultEventList.add(event);
				}

			}

			resultEventList = resultEventList.stream().sorted(Comparator.comparing(ResultEvent::getStartTime))
					.collect(Collectors.toList());

			response.setResultEvent(resultEventList);
			return response;
		} catch (RestClientException e) {
			logger.error("error retrieve response from the-odds-api.com", e);
			response.setStatusCode(1);
			response.setResultMessage(Constants.RETRIEVE_RESULT_API_EXCEPTION);
			return response;
		} catch (ParseException e) {
			logger.error("error parsing date ", e);
			response.setStatusCode(2);
			response.setResultMessage(Constants.DATE_PARSING_EXCEPTION);
			return response;
		}

	}

}
