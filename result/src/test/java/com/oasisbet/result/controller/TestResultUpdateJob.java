package com.oasisbet.result.controller;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
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

public class TestResultUpdateJob extends TestBaseSetup {

	@MockBean
	private RestTemplate mockRestTemplate;

	@Autowired
	private Scheduler quartzScheduler;

	@Test
	public void testResultUpdateJob() throws SchedulerException, InterruptedException {
		ResultApiResponse[] mockBody = ResultFixture.mockEplResultApiResponseArray();
		ResponseEntity<Object> mockResponseEntity = new ResponseEntity<>(mockBody, HttpStatus.OK);

		when(mockRestTemplate.getForEntity(Mockito.anyString(), Mockito.any()))
				.thenAnswer(invocation -> mockResponseEntity);

		JobKey jobKey = new JobKey("resultUpdateJob", "testResultGroup"); // Replace with your job name and group name

		quartzScheduler.triggerJob(jobKey);

		Thread.sleep(5000);

		quartzScheduler.shutdown(true);
	}

}
