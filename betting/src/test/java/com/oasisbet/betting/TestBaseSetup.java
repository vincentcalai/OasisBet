package com.oasisbet.betting;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.betting.odds.model.SportsEventMapping;

@TestExecutionListeners(mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS, listeners = DependencyInjectionTestExecutionListener.class)
@AutoConfigureMockMvc
@SpringBootTest
public abstract class TestBaseSetup {

	// This class is to initialize the embedded MongoDB database with data
	@BeforeEach
	public void setupMongoDbData(@Autowired MongoTemplate mongoTemplate) throws IOException {
		Path currentDir = Paths.get(System.getProperty("user.dir"));
		Path parentDir = currentDir.getParent();
		String sportsEventMappingFilePath = parentDir.toAbsolutePath() + File.separator + "test-data" + File.separator
				+ "OasisBet.sports_event_mapping.json";

		// Read the JSON data from file
		String jsonData = new String(Files.readAllBytes(Paths.get(sportsEventMappingFilePath)));

		// Convert JSON to Java objects
		ObjectMapper objectMapper = new ObjectMapper();
		List<SportsEventMapping> events = objectMapper.readValue(jsonData,
				new TypeReference<List<SportsEventMapping>>() {
				});

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		Date tomorrowDate = calendar.getTime();

		calendar.add(Calendar.DAY_OF_MONTH, -95);
		Date ninetyFiveDaysAgo = calendar.getTime();

		for (int i = 0; i < 18; i++) {
			events.get(i).setCommenceTime(tomorrowDate);
		}

		for (int i = 15; i < 18; i++) {
			events.get(i).setCreateDt(ninetyFiveDaysAgo);
		}

		// Save the events to the collection
		mongoTemplate.insert(events, "sports_event_mapping");
	}

	@AfterEach
	public void destroyMongoDbData(@Autowired MongoTemplate mongoTemplate) throws IOException {
		Query query = new Query();
		mongoTemplate.remove(query, "sports_event_mapping");
	}
}