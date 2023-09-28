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

import com.oasisbet.result.util.ResultUpdateJob;

@Configuration
public class TestQuartzConfig {

	@Bean
	public Scheduler quartzScheduler() throws SchedulerException {
		Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

		Trigger trigger = TriggerBuilder.newTrigger().withIdentity("testResultUpdateJobTrigger").startNow().build();

		scheduler.scheduleJob(testResultUpdateJobDetail(), trigger);

		return scheduler;
	}

	@Bean
	public JobDetail testResultUpdateJobDetail() {
		return JobBuilder.newJob(ResultUpdateJob.class).withIdentity("resultUpdateJob", "testResultGroup")
				.storeDurably().build();
	}
}
