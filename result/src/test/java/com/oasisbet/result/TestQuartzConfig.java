package com.oasisbet.result;

//@Configuration
//public class TestQuartzConfig {
//
//	@Bean
//	public Scheduler quartzScheduler() throws SchedulerException {
//		Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();
//
//		Trigger trigger = TriggerBuilder.newTrigger().withIdentity("testResultUpdateJobTrigger").startNow().build();
//		Trigger trigger2 = TriggerBuilder.newTrigger().withIdentity("testResultHouseKeepingJobTrigger").startNow()
//				.build();
//
//		scheduler.scheduleJob(testResultUpdateJobDetail(), trigger);
//		scheduler.scheduleJob(testResultHouseKeepingJobDetail(), trigger2);
//
//		return scheduler;
//	}
//
//	@Bean
//	public JobDetail testResultUpdateJobDetail() {
//		return JobBuilder.newJob(ResultUpdateJob.class).withIdentity("resultUpdateJob", "testResultGroup")
//				.storeDurably().build();
//	}
//
//	@Bean
//	public JobDetail testResultHouseKeepingJobDetail() {
//		return JobBuilder.newJob(ResultHouseKeepingJob.class).withIdentity("resultHouseKeepingJob", "testResultGroup")
//				.storeDurably().build();
//	}
//}
