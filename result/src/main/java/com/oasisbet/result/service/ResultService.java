package com.oasisbet.result.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oasisbet.result.dao.IResultEventMappingDao;
import com.oasisbet.result.dao.ISportsEventMappingDao;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.SportsEventMapping;
import com.oasisbet.result.util.Constants;

@Service
public class ResultService {

	@Autowired
	IResultEventMappingDao resultEventMappingDao;

	@Autowired
	ISportsEventMappingDao sportsEventMappingDao;

	private Logger logger = LoggerFactory.getLogger(ResultService.class);

	public List<ResultEvent> processMapping(List<ResultEventMapping> resultEventMappingList) {
		List<ResultEvent> resultEventList = new ArrayList<>();
		for (ResultEventMapping resultEvent : resultEventMappingList) {
			BigInteger eventId = resultEvent.getEventId();
			Optional<SportsEventMapping> sportsEventOptional = sportsEventMappingDao.findById(eventId);
			if (sportsEventOptional.isPresent()) {
				SportsEventMapping sportsEvent = sportsEventOptional.get();
				String competition = resultEvent.getCompType();
				String eventDesc = sportsEvent.getHomeTeam() + " vs " + sportsEvent.getAwayTeam();
				Date startTime = sportsEvent.getCommenceTime();
				boolean completed = resultEvent.isCompleted();
				String homeTeam = sportsEvent.getHomeTeam();
				String awayTeam = sportsEvent.getAwayTeam();
				String score = resultEvent.getScore();
				Date lastUpdatedDt = resultEvent.getLastUpdatedDt();
				ResultEvent resultEventBean = new ResultEvent(eventId, competition, eventDesc, startTime, completed,
						homeTeam, awayTeam, score, lastUpdatedDt);
				resultEventList.add(resultEventBean);
			}
		}
		return resultEventList;
	}

	public boolean validateUpdateResultFlag(ResultEventMapping searchResult) {
		String score = searchResult.getScore();
		String outcome = searchResult.getOutcome();

		return (score == null || score.isEmpty()) && (outcome == null || outcome.isEmpty());
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

	public List<ResultEventMapping> retrieveCompletedResults() {
		return resultEventMappingDao.findByCompleted(Constants.TRUE);
	}

	public List<ResultEventMapping> retrieveByCompType(String compType) {
		return resultEventMappingDao.findByCompType(compType);
	}

}
