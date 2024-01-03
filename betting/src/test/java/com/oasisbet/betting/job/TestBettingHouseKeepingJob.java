package com.oasisbet.betting.job;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.odds.dao.ISportsEventMappingDao;
import com.oasisbet.betting.odds.model.SportsEventMapping;
import com.oasisbet.betting.odds.util.BettingHouseKeepingJob;

@ExtendWith(MockitoExtension.class)
class TestBettingHouseKeepingJob extends TestBaseSetup {

	@Autowired
	private BettingHouseKeepingJob bettingHouseKeepingJob;

	@Autowired
	private ISportsEventMappingDao sportsEventMappingDao;

	@Test
	void testBettingHouseKeepingJobEventNotCompletedNoDelete() throws SchedulerException, InterruptedException {

		List<SportsEventMapping> sportsEventList = sportsEventMappingDao.findAll();
		assertEquals(18, sportsEventList.size());

		// update all completed events to todays date, to avoid deletions
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -90);
		Date ninetyDaysAgo = calendar.getTime();
		List<SportsEventMapping> ninetyDaysAgoSportsEventList = sportsEventMappingDao
				.findByCompletedAndCreateDtBefore(true, ninetyDaysAgo);
		ninetyDaysAgoSportsEventList = ninetyDaysAgoSportsEventList.stream().map(event -> {
			event.setCreateDt(new Date());
			return event;
		}).collect(Collectors.toList());
		sportsEventMappingDao.saveAll(ninetyDaysAgoSportsEventList);

		bettingHouseKeepingJob.execute(null);

		List<SportsEventMapping> newSportsEventList = sportsEventMappingDao.findAll();
		assertEquals(18, newSportsEventList.size());
	}

	@Test
	void testBettingHouseKeepingJobDelete3RecordsSuccess() throws SchedulerException, InterruptedException {

		List<SportsEventMapping> sportsEventList = sportsEventMappingDao.findAll();
		assertEquals(18, sportsEventList.size());

		Optional<SportsEventMapping> eventOptional1 = sportsEventMappingDao.findById(BigInteger.valueOf(5000001L));
		assertTrue(eventOptional1.isPresent());
		SportsEventMapping event1 = eventOptional1.get();
		event1.setCompleted(true);
		sportsEventMappingDao.save(event1);

		Optional<SportsEventMapping> eventOptional2 = sportsEventMappingDao.findById(BigInteger.valueOf(5000002L));
		assertTrue(eventOptional2.isPresent());
		SportsEventMapping event2 = eventOptional2.get();
		event2.setCompleted(true);
		sportsEventMappingDao.save(event2);

		bettingHouseKeepingJob.execute(null);

		List<SportsEventMapping> newSportsEventList = sportsEventMappingDao.findAll();
		assertEquals(13, newSportsEventList.size());
	}

}