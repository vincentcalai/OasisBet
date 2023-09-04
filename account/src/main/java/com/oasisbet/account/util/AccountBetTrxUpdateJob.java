package com.oasisbet.account.util;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AccountBetTrxUpdateJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Logger log = LoggerFactory.getLogger(AccountBetTrxUpdateJob.class);

		log.info("executing AccountBetTrxUpdateJob...");
	}

}