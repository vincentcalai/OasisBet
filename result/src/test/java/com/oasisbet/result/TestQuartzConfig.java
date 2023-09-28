package com.oasisbet.result;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.oasisbet.result.util.ResultHouseKeepingJob;
import com.oasisbet.result.util.ResultUpdateJob;

@Configuration
public class TestQuartzConfig {

	@Bean
	public Scheduler quartzScheduler() throws SchedulerException {
		Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

		Trigger trigger = TriggerBuilder.newTrigger().withIdentity("testResultUpdateJobTrigger").startNow().build();
		Trigger trigger2 = TriggerBuilder.newTrigger().withIdentity("testResultHouseKeepingJobTrigger").startNow()
				.build();

		scheduler.scheduleJob(testResultUpdateJobDetail(), trigger);
		scheduler.scheduleJob(testResultHouseKeepingJobDetail(), trigger2);

		return scheduler;
	}

	@Bean
	public JobDetail testResultUpdateJobDetail() {
		return JobBuilder.newJob(ResultUpdateJob.class).withIdentity("resultUpdateJob", "testResultGroup")
				.storeDurably().build();
	}

	@Bean
	public JobDetail testResultHouseKeepingJobDetail() {
		return JobBuilder.newJob(ResultHouseKeepingJob.class).withIdentity("resultHouseKeepingJob", "testResultGroup")
				.storeDurably().build();
	}
}
