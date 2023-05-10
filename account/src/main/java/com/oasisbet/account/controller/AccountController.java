package com.oasisbet.account.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oasisbet.account.model.StatusResponse;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/account")
public class AccountController {

	@GetMapping(value = "/retrieveAccDetails")
	public StatusResponse retrieveAccDetails() {
		return new StatusResponse();
	}

}
