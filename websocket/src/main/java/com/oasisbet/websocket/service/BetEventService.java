package com.oasisbet.websocket.service;

import com.oasisbet.websocket.model.BetEvent;
import com.oasisbet.websocket.model.Greeting;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BetEventService {

    @Autowired
    private SimpMessagingTemplate template;

    public void consumeBetEvent(String betEventJson) {
        log.info("BetEventService :: Consuming Bet Event {} ", betEventJson);
        template.convertAndSend("/topic/odds", betEventJson);
    }
}
