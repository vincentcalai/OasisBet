package com.oasisbet.result.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.Document;
import org.springframework.stereotype.Service;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.Score;
import com.oasisbet.result.util.MongoDBConnection;

@Service
public class ResultService {
	public List<ResultEvent> processMapping(ResultApiResponse[] results) throws ParseException {
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
		return resultEventList;
	}

	public boolean validateUpdateResultFlag(Document searchResult) {
		String score = null;
		String outcome = null;
		Date lastUpdatedDt = null;

		if (searchResult.containsKey("score")) {
			score = searchResult.getString("score");
		}

		if (searchResult.containsKey("outcome")) {
			outcome = searchResult.getString("outcome");
		}

		if (searchResult.containsKey("last_updated_dt")) {
			lastUpdatedDt = searchResult.getDate("last_updated_dt");
		}

		return (score == null || score.isEmpty()) && (outcome == null || outcome.isEmpty()) && lastUpdatedDt == null;
	}

	public String determineOutcome(String homeScore, String awayScore) {
		Integer homeScoreInt = Integer.parseInt(homeScore);
		Integer awayScoreInt = Integer.parseInt(awayScore);
		if (homeScoreInt > awayScoreInt)
			return "01";
		else if (awayScoreInt > homeScoreInt)
			return "03";
		else
			return "02";
	}

	public void retrieveCompletedResults(List<ResultEventMapping> resultEventMappingList) {
		MongoCollection<Document> resultCollection = MongoDBConnection.getInstance().getResultEventMappingCollection();
		Document filter = new Document("completed", true);
		FindIterable<Document> results = resultCollection.find(filter);
		for (Document result : results) {
			ResultEventMapping resultEventMapping = new ResultEventMapping();
			resultEventMapping.setEventId(result.getLong("event_id"));
			resultEventMapping.setApiEventId(result.getString("api_event_id"));
			resultEventMapping.setCompType(result.getString("comp_type"));
			resultEventMapping.setScore(result.getString("score"));
			resultEventMapping.setOutcome(result.getString("outcome"));
			resultEventMapping.setCompleted(result.getBoolean("completed"));
			resultEventMapping.setCompletedDt(result.getDate("lastUpdatedDt"));
			resultEventMappingList.add(resultEventMapping);
		}
	}

}
