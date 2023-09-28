package com.oasisbet.result.job;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.result.TestBaseSetup;
import com.oasisbet.result.fixture.ResultFixture;
import com.oasisbet.result.model.ResultApiResponse;

@ExtendWith(MockitoExtension.class)
public class TestResultUpdateJob extends TestBaseSetup {

	@Autowired
	private Scheduler quartzScheduler;

	@MockBean
	private RestTemplate mockRestTemplate;

	@BeforeEach
	void startScheduler() throws SchedulerException {
		quartzScheduler.start();
	}

	@Test
	void testResultUpdateJob() throws SchedulerException, InterruptedException {

		ResultApiResponse[] mockBody = ResultFixture.mockEplResultApiResponseArray();
		ResponseEntity<Object> mockResponseEntity = new ResponseEntity<>(mockBody, HttpStatus.OK);

		when(mockRestTemplate.getForEntity(Mockito.anyString(), Mockito.any()))
				.thenAnswer(invocation -> mockResponseEntity);

		JobKey jobKey = new JobKey("resultUpdateJob", "testResultGroup");

		quartzScheduler.triggerJob(jobKey);
	}

	@Test
	void testResultHouseKeepingJob() throws SchedulerException, InterruptedException {
		JobKey jobKey = new JobKey("resultHouseKeepingJob", "testResultGroup");
		quartzScheduler.triggerJob(jobKey);
	}

}
