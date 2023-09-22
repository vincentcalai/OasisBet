package com.oasisbet.betting.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.service.OddsService;

@ExtendWith(MockitoExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TestOddsService extends TestBaseSetup {

	@Autowired
	private OddsService oddsService;

	@Test
	void testRetrieveBetEventByCompTypeCountIs3() {
		List<BetEvent> results = oddsService.retrieveBetEventByCompType("soccer_epl");
		assertEquals(3, results.size());
	}
}
