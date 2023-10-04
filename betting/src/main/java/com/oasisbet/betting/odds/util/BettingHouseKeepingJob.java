package com.oasisbet.betting.odds.util;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oasisbet.betting.odds.dao.ISportsEventMappingDao;
import com.oasisbet.betting.odds.model.SportsEventMapping;

@Service
public class BettingHouseKeepingJob implements Job {

	@Autowired
	ISportsEventMappingDao sportsEventMappingDao;

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(BettingHouseKeepingJob.class);

		log.info("executing BettingHouseKeepingJob...");

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -90);
		Date ninetyDaysAgo = calendar.getTime();

		List<SportsEventMapping> ninetyDaysAgoSportsEventList = sportsEventMappingDao
				.findByCreateDtBefore(ninetyDaysAgo);

		List<BigInteger> deleteIdList = ninetyDaysAgoSportsEventList.stream().map(event -> event.getEventId())
				.collect(Collectors.toList());

		sportsEventMappingDao.deleteAllById(deleteIdList);
	}

}
