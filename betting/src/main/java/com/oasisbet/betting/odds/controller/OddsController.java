package com.oasisbet.betting.odds.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/odds")
public class OddsController {
	@GetMapping(value = "/retrieveOdds")
	public ResponseEntity retrieveOdds(@RequestParam("compType") String compType) {
		// return oddsService.findAll(compType);
		System.out.println("TESTINGGGGG");
		return null;
	}
}
