package com.oasisbet.result.job;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
	void testResultUpdateJob3NewEventsInsertedSuccess() throws SchedulerException, InterruptedException {

		List<ResultEventMapping> resultEventList = resultEventMappingDao.findAll();
		assertEquals(23, resultEventList.size());

		ResultApiResponse[] mockBody = ResultFixture.mockEplResultApiResponseArray();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockBody, HttpStatus.OK));

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		assertEquals(26, newResultEventList.size());
	}

	@Test
	void testResultUpdateJob3NewEventsInsertedVerifyApiEventIdSuccess()
			throws SchedulerException, InterruptedException {

		ResultApiResponse[] mockBody = ResultFixture.mockEplResultApiResponseArray();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockBody, HttpStatus.OK));

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		long eventCount1 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("e306340bed661722ad957e5d8c15f798")).count();
		long eventCount2 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("2ad957e5d8661722ad957e5d8c15f798")).count();
		long eventCount3 = newResultEventList.stream()
				.filter(event -> event.getApiEventId().equals("1722ad957e661722ad957e5d8c15f798")).count();
		assertEquals(1, eventCount1);
		assertEquals(1, eventCount2);
		assertEquals(1, eventCount3);
	}

	@Test
	void testResultUpdateJob3NewEventsInsertedVerifyEventIdSuccess() throws SchedulerException, InterruptedException {

		ResultApiResponse[] mockBody = ResultFixture.mockEplResultApiResponseArray();

		when(restTemplate.getForEntity(Mockito.anyString(), Mockito.eq(ResultApiResponse[].class)))
				.thenReturn(new ResponseEntity<>(mockBody, HttpStatus.OK));

		resultUpdateJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		long eventCount1 = newResultEventList.stream()
				.filter(event -> event.getEventId().equals(BigInteger.valueOf(1000003L))).count();
		long eventCount2 = newResultEventList.stream()
				.filter(event -> event.getEventId().equals(BigInteger.valueOf(1000004L))).count();
		long eventCount3 = newResultEventList.stream()
				.filter(event -> event.getEventId().equals(BigInteger.valueOf(1000005L))).count();
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

}
