package com.oasisbet.result.util;

import java.util.ArrayList;
import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;
import com.oasisbet.result.model.EventIdMap;

@Service
public class EventIdMappingJob implements Job {

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(EventIdMappingJob.class);

		log.info("executing EventIdMappingJob...");

		MongoCollection<EventIdMap> collection = MongoDBConnection.getInstance().getCollection();
		List<EventIdMap> eplEvents = collection.find(Filters.eq("compType", "EPL")).sort(Sorts.ascending("eventId"))
				.into(new ArrayList<>());

		for (EventIdMap event : eplEvents) {
			log.info("id: " + event.getEventId() + " source: " + event.getSourceId() + " compType: "
					+ event.getCompType());
		}

	}

//	private int getSequenceValue(MongoCollection<EventIdMap> collection) {
//		// Find the document with the highest _id value
//		EventIdMap doc = collection.find().sort(new EventIdMap("_id", -1)).limit(1).first();
//
//		// If no documents exist yet, start the sequence at 0
//		if (doc == null) {
//			return 0;
//		}
//
//		// Get the value of the highest _id and return it
//		return doc.getInteger("_id");
//	}

}
