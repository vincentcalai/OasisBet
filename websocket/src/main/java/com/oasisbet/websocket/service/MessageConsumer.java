package com.oasisbet.websocket.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.websocket.model.BetEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageConsumer {

    @KafkaListener(topics = "odds-topic", groupId = "odds-group-id", containerFactory = "kafkaListenerContainerFactory")
    public void listen(String betEventJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules(); // Handles Java 8 date and time serialization

        try {
            log.info("Received kafka message: " + betEventJson);
            BetEvent betEvent = objectMapper.readValue(betEventJson, BetEvent.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
