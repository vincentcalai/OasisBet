package com.oasisbet.account.util;

import java.math.BigInteger;
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
			Map<BigInteger, ResultEventMapping> resultMap = accountService.retrieveCompletedResults();
			List<AccountBetTrxView> unsettledBetTrxList = accountService.retrieveNotSettledBetTrx();
			unsettledBetTrxList.forEach(betTrx -> {
				BigInteger eventId = BigInteger.valueOf(betTrx.getEventId());
				if (resultMap.containsKey(eventId)) {
					// process bet trx settlement based on result outcome of completed event
					ResultEventMapping resultEvent = resultMap.get(eventId);

					if (Constants.BET_TYPE_1X2.equals(betTrx.getBetType())) {
						boolean isBetTrxWin = betTrx.getBetSelection().equals(resultEvent.getOutcome());
						if (isBetTrxWin) {
							// process winning bet trx for 1X2 bets
							accountService.process1X2BetTrxSettlement(betTrx);
						}
						// update bet trx is_settled flag
						betTrx.setSettled(Constants.TRUE);
						accountService.updateBetTrx(betTrx);
					}
				}
			});
		} catch (Exception e) {
			log.error("error retrieving completed result events from Result Microservice", e);
		}

	}

}