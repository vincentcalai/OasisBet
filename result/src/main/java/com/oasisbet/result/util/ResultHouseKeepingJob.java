package com.oasisbet.result.util;

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

import com.oasisbet.result.dao.IResultEventMappingDao;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.service.ResultService;

@Service
public class ResultHouseKeepingJob implements Job {

	@Autowired
	IResultEventMappingDao resultEventMappingDao;

	@Autowired
	ResultService resultService;

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(ResultHouseKeepingJob.class);

		log.info("executing ResultHouseKeepingJob...");

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -90);
		Date ninetyDaysAgo = calendar.getTime();

		List<ResultEventMapping> ninetyDaysAgoResultEventList = resultEventMappingDao
				.findByCompletedAndLastUpdatedDtBefore(Constants.TRUE, ninetyDaysAgo);
		List<BigInteger> deleteIdList = ninetyDaysAgoResultEventList.stream().map(event -> event.getEventId())
				.collect(Collectors.toList());

		resultEventMappingDao.deleteAllById(deleteIdList);
	}

}
