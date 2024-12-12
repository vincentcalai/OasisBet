package com.oasisbet.websocket.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {

    @KafkaListener(topics = "odds-topic", groupId = "odds-group-id")
    public void listen(String message) {
        System.out.println("Received message: " + message);
    }

}
