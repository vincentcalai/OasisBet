package com.oasisbet.result.job;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.result.TestBaseSetup;
import com.oasisbet.result.dao.IResultEventMappingDao;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.util.ResultHouseKeepingJob;

@ExtendWith(MockitoExtension.class)
class TestResultHouseKeepingJob extends TestBaseSetup {

	@Autowired
	private ResultHouseKeepingJob resultHouseKeepingJob;

	@Autowired
	private IResultEventMappingDao resultEventMappingDao;

	@Test
	void testResultHouseKeepingJobDelete3RecordsSuccess() throws SchedulerException, InterruptedException {

		Date currentDate = new Date();

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -95);
		Date ninetyFiveDaysAgo = calendar.getTime();

		List<ResultEventMapping> resultEventList = resultEventMappingDao.findAll();
		assertEquals(23, resultEventList.size());

		for (int i = 0; i < 20; i++) {
			resultEventList.get(i).setLastUpdatedDt(currentDate);
		}
		for (int i = 20; i < 23; i++) {
			resultEventList.get(i).setLastUpdatedDt(ninetyFiveDaysAgo);
		}
		resultEventMappingDao.saveAll(resultEventList);

		resultHouseKeepingJob.execute(null);

		List<ResultEventMapping> newResultEventList = resultEventMappingDao.findAll();
		assertEquals(20, newResultEventList.size());
	}

}
