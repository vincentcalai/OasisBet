package com.oasisbet.account.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.request.CreateUserRest;
import com.oasisbet.account.service.UserService;

@RestController
@RequestMapping(path = "/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping(value = "/createUser")
	public StatusResponse createUser(@RequestBody CreateUserRest userInput) {
		return userService.createUser(userInput);
	}

}
