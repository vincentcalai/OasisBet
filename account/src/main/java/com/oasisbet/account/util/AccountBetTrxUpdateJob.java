package com.oasisbet.account.util;

import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oasisbet.account.model.ResultEventMapping;
import com.oasisbet.account.service.AccountService;
import com.oasisbet.account.view.AccountBetTrxView;

@Service
public class AccountBetTrxUpdateJob implements Job {

	@Autowired
	private AccountService accountService;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Logger log = LoggerFactory.getLogger(AccountBetTrxUpdateJob.class);

		log.info("executing AccountBetTrxUpdateJob...");

		try {
			Map<Long, ResultEventMapping> resultMap = accountService.retrieveCompletedResults();
			List<AccountBetTrxView> unsettledBetTrxList = accountService.retrieveNotSettledBetTrx();
			unsettledBetTrxList.forEach(betTrx -> {
				if (resultMap.containsKey(betTrx.getEventId())) {
					// process bet trx settlement based on result outcome of completed event
					ResultEventMapping resultEvent = resultMap.get(betTrx.getEventId());
					// process bet trx settlement for 1X2 bets
					if (Constants.BET_TYPE_1X2.equals(betTrx.getBetType())
							&& betTrx.getBetSelection().equals(resultEvent.getOutcome())) {
						// accountService.processBetTrxSettlement(betTrx);
					}
				}
			});
		} catch (Exception e) {
			log.error("error retrieving completed result events from Result Microservice", e);
		}

	}

}