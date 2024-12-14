package com.oasisbet.betting.odds.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.response.OddsApiResponse;
import com.oasisbet.betting.odds.service.KafkaMessageProducer;
import com.oasisbet.betting.odds.service.OddsService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static com.oasisbet.betting.odds.util.Constants.API_SOURCE_COMP_TYPE_LIST;

@Service
public class KafkaBetEventsJob implements Job {

	@Autowired
	public OddsService oddsService;

	@Autowired
	public KafkaMessageProducer messageProducer;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Logger log = LoggerFactory.getLogger(KafkaBetEventsJob.class);

		log.info("executing KafkaBetEventsJob...");

		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.findAndRegisterModules();

		for(String compType : API_SOURCE_COMP_TYPE_LIST){
			List<BetEvent> betEventList = oddsService.retrieveBetEventByCompType(compType);

			betEventList.forEach(betEvent -> {
				try {
					String betEventJson = objectMapper.writeValueAsString(betEvent);
					log.info("Sending kafka message from Betting microservice: " + betEventJson);
					messageProducer.sendMessage("odds-topic", betEventJson);
				} catch (Exception e) {
					log.error("Error in sending Bet Events to Kafka server: ", e);
				}
			});
		}

	}

}