package com.oasisbet.betting.job;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.fixture.BettingFixture;
import com.oasisbet.betting.odds.dao.ISportsEventMappingDao;
import com.oasisbet.betting.odds.model.SportsEventMapping;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.util.BetEventUpdateJob;

@ExtendWith(MockitoExtension.class)
class TestBetEventUpdateJob extends TestBaseSetup {

	@MockBean
	private RestTemplate restTemplate;

	@Autowired
	private BetEventUpdateJob betEventUpdateJob;

	@Autowired
	private ISportsEventMappingDao sportsEventMappingDao;

	@Test
	void testBetEventUpdateJobInsert2NewEventsSuccess() throws SchedulerException, InterruptedException {
		List<SportsEventMapping> sportsEventList = sportsEventMappingDao.findAll();
		assertEquals(18, sportsEventList.size());

		OddsApiResponse[] mockEplBody = BettingFixture.mockEplOddsApiResponseArray();
		OddsApiResponse[] mockLigaBody = BettingFixture.mockLaLigaOddsApiResponseArray();
		OddsApiResponse[] mockBundesligaBody = BettingFixture.mockBundesligaOddsApiResponseArray();
		OddsApiResponse[] mockSerieABody = BettingFixture.mockSerieAOddsApiResponseArray();
		OddsApiResponse[] mockLigueOneBody = BettingFixture.mockLigueOneOddsApiResponseArray();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(OddsApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockEplBody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockLigaBody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockBundesligaBody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockSerieABody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockLigueOneBody, HttpStatus.OK));

		betEventUpdateJob.execute(null);

		List<SportsEventMapping> newSportsEventList = sportsEventMappingDao.findAll();
		assertEquals(20, newSportsEventList.size());
	}

	@Test
	void testBetEventUpdateJobConnErrorInsert2NewEventsFail() throws SchedulerException, InterruptedException {
		List<SportsEventMapping> sportsEventList = sportsEventMappingDao.findAll();
		assertEquals(18, sportsEventList.size());

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(OddsApiResponse[].class)))
				.thenThrow(RestClientException.class);

		betEventUpdateJob.execute(null);

		List<SportsEventMapping> newSportsEventList = sportsEventMappingDao.findAll();
		assertEquals(18, newSportsEventList.size());
	}

}
