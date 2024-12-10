package com.oasisbet.betting.odds.controller;

import com.oasisbet.betting.odds.model.Greeting;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(String name) {
        return new Greeting("Hello, " + name + "!");
    }
}
