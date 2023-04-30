package com.oasisbet.result.util;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EventIdMappingJob implements Job {

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(EventIdMappingJob.class);

		log.info("executing EventIdMappingJob...");

	}

}
