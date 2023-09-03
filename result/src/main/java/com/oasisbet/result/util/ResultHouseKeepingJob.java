package com.oasisbet.result.util;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

import org.bson.Document;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoCollection;
import com.oasisbet.result.service.ResultService;

@Service
public class ResultHouseKeepingJob implements Job {

	MongoCollection<Document> resultCollection = MongoDBConnection.getInstance().getResultEventMappingCollection();

	@Autowired
	ResultService resultService;

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(ResultHouseKeepingJob.class);

		log.info("executing ResultHouseKeepingJob...");

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -30);
		Date thirtyDaysAgo = calendar.getTime();

		Document query = new Document("$and", Arrays.asList(
				new Document("completed_dt", new Document("$lt", thirtyDaysAgo)), new Document("completed", true)));

		resultCollection.deleteMany(query);

	}

}
