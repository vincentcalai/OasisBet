package com.oasisbet.websocket.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.websocket.model.BetEvent;
import com.oasisbet.websocket.model.Greeting;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class WebSocketController {

    @MessageMapping("/betting")
    @SendToUser("/topic/odds")
    public BetEvent oddsTopicWebSocket(String betEventJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules(); // Handles Java 8 date and time serialization
        BetEvent betEvent = null;
        try {
            betEvent = objectMapper.readValue(betEventJson, BetEvent.class);
            log.info("Vincent greeting test succeed!");
        } catch (Exception e) {
            log.error("Error in reading Bet Event Json", e);
        }
        return betEvent;
    }
}
