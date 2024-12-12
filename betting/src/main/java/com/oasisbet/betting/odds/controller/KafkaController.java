package com.oasisbet.betting.odds.controller;

import com.oasisbet.betting.odds.service.KafkaMessageProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KafkaController {

    @Autowired
    private KafkaMessageProducer messageProducer;

    @PostMapping("/send")
    public String sendMessage(@RequestParam("message") String message) {
        messageProducer.sendMessage("odds-topic", message);
        return "Message sent: " + message;
    }

}
