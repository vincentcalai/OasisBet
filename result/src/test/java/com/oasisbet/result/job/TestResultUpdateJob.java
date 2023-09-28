package com.oasisbet.result.job;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.oasisbet.result.TestBaseSetup;
import com.oasisbet.result.fixture.ResultFixture;
import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.util.ResultHouseKeepingJob;
import com.oasisbet.result.util.ResultUpdateJob;

@ExtendWith(MockitoExtension.class)
class TestResultUpdateJob extends TestBaseSetup {

	@MockBean
	private RestTemplate mockRestTemplate;

	public JobDetail testResultUpdateJobDetail() {
		return JobBuilder.newJob(ResultUpdateJob.class).withIdentity("resultUpdateJob", "testResultGroup")
				.storeDurably().build();
	}

	public JobDetail testResultHouseKeepingJobDetail() {
		return JobBuilder.newJob(ResultHouseKeepingJob.class).withIdentity("resultHouseKeepingJob", "testResultGroup")
				.storeDurably().build();
	}

	@Test
	void testResultUpdateJob() throws SchedulerException, InterruptedException {

		Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

		Trigger trigger = TriggerBuilder.newTrigger().withIdentity("testResultUpdateJobTrigger").startNow().build();

		scheduler.scheduleJob(testResultUpdateJobDetail(), trigger);

		scheduler.start();
		ResultApiResponse[] mockBody = ResultFixture.mockEplResultApiResponseArray();
		ResponseEntity<Object> mockResponseEntity = new ResponseEntity<>(mockBody, HttpStatus.OK);

		when(mockRestTemplate.getForEntity(Mockito.anyString(), Mockito.any()))
				.thenAnswer(invocation -> mockResponseEntity);

		JobKey jobKey = new JobKey("resultUpdateJob", "testResultGroup");

		scheduler.triggerJob(jobKey);
		scheduler.shutdown(true);
	}

	@Test
	void testResultHouseKeepingJob() throws SchedulerException, InterruptedException {
		Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

		Trigger trigger = TriggerBuilder.newTrigger().withIdentity("testResultHouseKeepingJobTrigger").startNow()
				.build();

		scheduler.scheduleJob(testResultHouseKeepingJobDetail(), trigger);

		scheduler.start();

		JobKey jobKey = new JobKey("resultHouseKeepingJob", "testResultGroup");
		scheduler.triggerJob(jobKey);

		scheduler.shutdown(true);
	}

}
