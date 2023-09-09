package com.oasisbet.account.util;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oasisbet.account.model.response.ResultEventMappingResponse;
import com.oasisbet.account.service.AccountService;

@Service
public class AccountBetTrxUpdateJob implements Job {

	@Autowired
	private AccountService accountService;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Logger log = LoggerFactory.getLogger(AccountBetTrxUpdateJob.class);

		log.info("executing AccountBetTrxUpdateJob...");

		ResultEventMappingResponse response = accountService.retrieveCompletedResults();

	}

}