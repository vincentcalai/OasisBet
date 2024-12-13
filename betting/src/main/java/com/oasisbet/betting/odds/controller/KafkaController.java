package com.oasisbet.betting.odds.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.response.BettingRestResponse;
import com.oasisbet.betting.odds.service.KafkaMessageProducer;
import com.oasisbet.betting.odds.service.OddsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/kafka")
@Slf4j
public class KafkaController {

    @Autowired
    private KafkaMessageProducer messageProducer;
    @Autowired
    public OddsService oddsService;

    @PostMapping("/send")
    public String sendMessage(@RequestParam("compType") String compType) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        List<BetEvent> betEventList = oddsService.retrieveBetEventByCompType(compType);

        betEventList.forEach(betEvent -> {
            try {
                String betEventJson = objectMapper.writeValueAsString(betEvent);
                log.info("Received kafka message: " + betEventJson);
                messageProducer.sendMessage("odds-topic", betEventJson);
            } catch (Exception e) {
                e.printStackTrace();
            }

        });

        return "Message sent: " + compType;
    }

}
