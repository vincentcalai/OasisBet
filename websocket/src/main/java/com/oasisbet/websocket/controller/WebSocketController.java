package com.oasisbet.websocket.controller;

import com.oasisbet.websocket.model.Greeting;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/hello")
    @SendToUser("/topic/greetings")
    public Greeting greeting(String name) {
        return new Greeting("Hello, " + name + "!");
    }
}
