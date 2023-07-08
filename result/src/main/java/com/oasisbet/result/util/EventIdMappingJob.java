package com.oasisbet.result.util;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;

@Service
public class EventIdMappingJob implements Job {

	@Override
	public void execute(JobExecutionContext context) {

		Logger log = LoggerFactory.getLogger(EventIdMappingJob.class);

		log.info("executing EventIdMappingJob...");

		MongoCollection<Document> collection = MongoDBConnection.getInstance().getCollection();
		List<Document> eplEvents = collection.find(Filters.eq("compType", "EPL")).sort(Sorts.ascending("eventId"))
				.into(new ArrayList<>());

		for (Document event : eplEvents) {
			log.info("id: " + event.getString(Constants.EVENT_ID) + " source: "
					+ event.getString(Constants.API_EVENT_ID) + " compType: " + event.getString(Constants.COMP_TYPE));
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
