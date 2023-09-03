package com.oasisbet.result.util;

import java.io.IOException;
import java.util.Properties;

import org.quartz.JobDetail;
import org.quartz.Trigger;
import org.quartz.spi.JobFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

@Configuration
public class SchedulerConfig {

	@Bean
	public JobFactory jobFactory(ApplicationContext applicationContext) {
		AutowiringSpringBeanJobFactory jobFactory = new AutowiringSpringBeanJobFactory();
		jobFactory.setApplicationContext(applicationContext);
		return jobFactory;
	}

	@Bean
	public SchedulerFactoryBean schedulerFactoryBean(JobFactory jobFactory, Trigger[] jobTriggers) throws IOException {
		SchedulerFactoryBean factory = new SchedulerFactoryBean();
		factory.setJobFactory(jobFactory);
		factory.setQuartzProperties(quartzProperties());
		factory.setTriggers(jobTriggers);
		return factory;
	}

	@Bean
	public Properties quartzProperties() throws IOException {
		PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
		propertiesFactoryBean.setLocation(new ClassPathResource("/application.properties"));
		propertiesFactoryBean.afterPropertiesSet();
		return propertiesFactoryBean.getObject();
	}

	// Setup Cron Job resultUpdateJobTrigger

	@Bean
	public CronTriggerFactoryBean resultUpdateJobTrigger(@Qualifier("resultUpdateJobDetail") JobDetail jobDetail) {
		CronTriggerFactoryBean factoryBean = new CronTriggerFactoryBean();
		factoryBean.setJobDetail(jobDetail);
		factoryBean.setStartDelay(0L);
		factoryBean.setCronExpression("0 0 9 * * ?");
		// factoryBean.setCronExpression("0 */2 * ? * *");
		return factoryBean;
	}

	@Bean
	public JobDetailFactoryBean resultUpdateJobDetail() {
		JobDetailFactoryBean factoryBean = new JobDetailFactoryBean();
		factoryBean.setJobClass(ResultUpdateJob.class);
		factoryBean.setDurability(true);
		return factoryBean;
	}

	// Setup Cron Job resultHouseKeepingJobTrigger

	@Bean
	public CronTriggerFactoryBean resultHouseKeepingJobTrigger(
			@Qualifier("resultHouseKeepingJobDetail") JobDetail jobDetail) {
		CronTriggerFactoryBean factoryBean = new CronTriggerFactoryBean();
		factoryBean.setJobDetail(jobDetail);
		factoryBean.setStartDelay(0L);
		factoryBean.setCronExpression("0 0 9 * * ?");
		// factoryBean.setCronExpression("0 */2 * ? * *");
		return factoryBean;
	}

	@Bean
	public JobDetailFactoryBean resultHouseKeepingJobDetail() {
		JobDetailFactoryBean factoryBean = new JobDetailFactoryBean();
		factoryBean.setJobClass(ResultHouseKeepingJob.class);
		factoryBean.setDurability(true);
		return factoryBean;
	}
}
