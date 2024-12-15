package com.oasisbet.websocket.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.websocket.model.BetEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@Slf4j
public class WebSocketController {

    @MessageMapping("/betting")
    @SendToUser("/topic/odds")
    public List<BetEvent> oddsTopicWebSocket(String betEventJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules(); // Handles Java 8 date and time serialization
        List<BetEvent> betEvent = null;
        try {
            betEvent = objectMapper.readValue(betEventJson, new TypeReference<List<BetEvent>>() {});
        } catch (Exception e) {
            log.error("Error in reading Bet Event Json", e);
        }
        return betEvent;
    }
}
