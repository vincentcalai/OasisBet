package com.oasisbet.account.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.request.CreateUserRest;
import com.oasisbet.account.service.UserService;

public class TestUserController extends TestWithSpringBoot {
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserService userService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void testCreateUser() throws Exception {
		CreateUserRest userInput = new CreateUserRest();

		StatusResponse expectedResponse = new StatusResponse();

		Mockito.when(userService.createUser(Mockito.any(CreateUserRest.class))).thenReturn(expectedResponse);

		String request = objectMapper.writeValueAsString(userInput);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/user/createUser")
				.contentType(MediaType.APPLICATION_JSON).content(request);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}
}
