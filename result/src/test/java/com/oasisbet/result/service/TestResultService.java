package com.oasisbet.result.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.oasisbet.result.TestBaseSetup;
import com.oasisbet.result.model.ResultEventMapping;

@ExtendWith(MockitoExtension.class)
class TestResultService extends TestBaseSetup {

	@Autowired
	private ResultService resultService;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Test
	void testRetrieveBetEventByCompTypeCountIs3() {
		List<ResultEventMapping> results = resultService.retrieveCompletedResults();
		assertEquals(3, results.size());
	}

	@Test
	void testDetermineOutcomeHomeWin() {
		String result = resultService.determineOutcome("3", "2");
		assertEquals("01", result);
	}

	@Test
	void testDetermineOutcomeDrawWin() {
		String result = resultService.determineOutcome("2", "2");
		assertEquals("02", result);
	}

	@Test
	void testDetermineOutcomeAwayWin() {
		String result = resultService.determineOutcome("1", "2");
		assertEquals("03", result);
	}

	@Test
	void testValidateUpdateResultFlagScoreNotEmptyFail() {
		ResultEventMapping mockResultEvent = new ResultEventMapping();
		mockResultEvent.setApiEventId("a085aa8beb661722ad957e5d8c15f798");
		mockResultEvent.setCompleted(false);
		mockResultEvent.setCompType("soccer_epl");
		mockResultEvent.setEventId(BigInteger.valueOf(1000001L));
		mockResultEvent.setLastUpdatedDt(null);
		mockResultEvent.setOutcome(null);
		mockResultEvent.setScore("2-1");
		boolean result = resultService.validateUpdateResultFlag(mockResultEvent);
		assertEquals(false, result);
	}

	@Test
	void testValidateUpdateResultFlagOutcomeNotEmptyFail() {
		ResultEventMapping mockResultEvent = new ResultEventMapping();
		mockResultEvent.setApiEventId("a085aa8beb661722ad957e5d8c15f798");
		mockResultEvent.setCompleted(false);
		mockResultEvent.setCompType("soccer_epl");
		mockResultEvent.setEventId(BigInteger.valueOf(1000001L));
		mockResultEvent.setLastUpdatedDt(new Date());
		mockResultEvent.setOutcome("03");
		mockResultEvent.setScore(null);
		boolean result = resultService.validateUpdateResultFlag(mockResultEvent);
		assertEquals(false, result);
	}

	@Test
	void testValidateUpdateResultFlagSuccess() {
		ResultEventMapping mockResultEvent = new ResultEventMapping();
		mockResultEvent.setApiEventId("a085aa8beb661722ad957e5d8c15f798");
		mockResultEvent.setCompleted(false);
		mockResultEvent.setCompType("soccer_epl");
		mockResultEvent.setEventId(BigInteger.valueOf(1000001L));
		mockResultEvent.setLastUpdatedDt(null);
		mockResultEvent.setOutcome(null);
		mockResultEvent.setScore(null);
		boolean result = resultService.validateUpdateResultFlag(mockResultEvent);
		assertEquals(true, result);
	}

}
