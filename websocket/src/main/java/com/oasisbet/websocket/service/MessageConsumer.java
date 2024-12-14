package com.oasisbet.websocket.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.websocket.model.BetEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageConsumer {

    @Autowired
    private BetEventService betEventService;

    @KafkaListener(topics = "odds-topic", groupId = "odds-group-id", containerFactory = "kafkaListenerContainerFactory")
    public void listen(String betEventJson) {
        try {
            log.info("Received kafka message: " + betEventJson);
            betEventService.consumeBetEvent(betEventJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
