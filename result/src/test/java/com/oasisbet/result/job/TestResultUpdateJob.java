package com.oasisbet.result.job;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.math.BigInteger;
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

import com.oasisbet.result.TestBaseSetup;
import com.oasisbet.result.dao.IResultEventMappingDao;
import com.oasisbet.result.fixture.ResultFixture;
import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.util.ResultUpdateJob;

@ExtendWith(MockitoExtension.class)
class TestResultUpdateJob extends TestBaseSetup {

	@MockBean
	private RestTemplate restTemplate;

	@Autowired
	private ResultUpdateJob resultUpdateJob;

	@Autowired
	private IResultEventMappingDao resultEventMappingDao;

	@Test
	void testResultUpdateJob1NewEplEventInsertedSuccess() throws SchedulerException, InterruptedException {

		List<ResultEventMapping> resultEventList = resultEventMappingDao.findAll();
		assertEquals(23, resultEventList.size());

		ResultApiResponse[] mockEplBody = ResultFixture.mockEplInsert3NewResultEvents();
		ResultApiResponse[] mockLigaBody = ResultFixture.mockLaLigaResultApiResponseArray();
		ResultApiResponse[] mockBundesligaBody = ResultFixture.mockBundesligaResultApiResponseArray();
		ResultApiResponse[] mockSerieABody = ResultFixture.mockSerieAResultApiResponseArray();
		ResultApiResponse[] mockLigueOneBody = ResultFixture.mockLigueOneResultApiResponseArray();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockEplBody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockLigaBody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockBundesligaBody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockSerieABody, HttpStatus.OK))
				.thenReturn(new ResponseEntity<>(mockLigueOneBody, HttpStatus.OK));

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		assertEquals(26, newResultEventList.size());
	}

	@Test
	void testResultUpdateJob3NewEventsInsertedVerifyApiEventIdSuccess()
			throws SchedulerException, InterruptedException {

		List<ResultEventMapping> resultEventList = resultEventMappingDao.findAll();
		assertEquals(23, resultEventList.size());

		ResultApiResponse[] mockBody = ResultFixture.mockEplInsert3NewResultEvents();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockBody, HttpStatus.OK));

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		assertEquals(26, newResultEventList.size());

		long eventCount1 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("66ca5a121b5ddc4763cf1708222be377")).count();
		long eventCount2 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("a085aa8beb661722ad957e5d8c15f798")).count();
		long eventCount3 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("f7d5d5a141e21df15f23b5e306340bed")).count();
		assertEquals(1, eventCount1);
		assertEquals(1, eventCount2);
		assertEquals(1, eventCount3);
	}

	@Test
	void testResultUpdateJob3NewEventsInsertedVerifyEventIdSuccess() throws SchedulerException, InterruptedException {

		ResultApiResponse[] mockBody = ResultFixture.mockEplInsert3NewResultEvents();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockBody, HttpStatus.OK));

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		long eventCount1 = newResultEventList.stream()
				.filter(event -> event.getEventId().equals(BigInteger.valueOf(1000000L))).count();
		long eventCount2 = newResultEventList.stream()
				.filter(event -> event.getEventId().equals(BigInteger.valueOf(1000001L))).count();
		long eventCount3 = newResultEventList.stream()
				.filter(event -> event.getEventId().equals(BigInteger.valueOf(1000002L))).count();
		assertEquals(1, eventCount1);
		assertEquals(1, eventCount2);
		assertEquals(1, eventCount3);
	}

	@Test
	void testResultUpdateJobConnFail3NewEventsNotInserted() throws SchedulerException, InterruptedException {

		List<ResultEventMapping> resultEventList = resultEventMappingDao.findAll();
		assertEquals(23, resultEventList.size());

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenThrow(RestClientException.class);

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		assertEquals(23, newResultEventList.size());
	}

	@Test
	void testResultUpdateJobResultEventUpdateSuccess() throws SchedulerException, InterruptedException {

		List<ResultEventMapping> resultEventList = resultEventMappingDao.findAll();
		assertEquals(23, resultEventList.size());

		ResultApiResponse[] mockBody = ResultFixture.mockSerieANewResultEvent();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockBody, HttpStatus.OK));

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		assertEquals(23, newResultEventList.size());

		long eventCount1 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("c4899d1a8129766fd5274de2c9b3a75b")).count();
		long eventCount2 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("d67985c60227e89deabf406c0f2af616")).count();
		long eventCount3 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("f3e32c2929d70533b2110a147b0c2858")).count();
		assertEquals(1, eventCount1);
		assertEquals(1, eventCount2);
		assertEquals(1, eventCount3);

		newResultEventList.forEach(result -> {
			if (result.getApiEventId().equals("c4899d1a8129766fd5274de2c9b3a75b")) {
				assertTrue(result.isCompleted());
				assertEquals("3-1", result.getScore());
				assertEquals("01", result.getOutcome());
			} else if (result.getApiEventId().equals("d67985c60227e89deabf406c0f2af616")) {
				assertTrue(result.isCompleted());
				assertEquals("2-2", result.getScore());
				assertEquals("02", result.getOutcome());
			} else if (result.getApiEventId().equals("f3e32c2929d70533b2110a147b0c2858")) {
				assertTrue(result.isCompleted());
				assertEquals("1-2", result.getScore());
				assertEquals("03", result.getOutcome());
			}
		});

	}

}
