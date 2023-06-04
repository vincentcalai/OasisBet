package com.oasisbet.betting;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.betting.model.TestSetupEvent;

@TestExecutionListeners(mergeMode = TestExecutionListeners.MergeMode.MERGE_WITH_DEFAULTS, listeners = DependencyInjectionTestExecutionListener.class)
@SpringBootTest
public abstract class TestBaseSetup {

	// This class is to initialize the embedded MongoDB database with data
	@BeforeEach
	public void setupMongoDbData(@Autowired MongoTemplate mongoTemplate) throws IOException {
		// Read the JSON data from file
		String jsonData = new String(
				Files.readAllBytes(Paths.get("C:\\Oasis\\OasisBet\\test-data\\OasisBet.sports_event_mapping.json")));

		// Convert JSON to Java objects
		ObjectMapper objectMapper = new ObjectMapper();
		List<TestSetupEvent> events = objectMapper.readValue(jsonData, new TypeReference<List<TestSetupEvent>>() {
		});

		// Save the events to the collection
		mongoTemplate.insert(events, "sports_event_mapping");
	}
}