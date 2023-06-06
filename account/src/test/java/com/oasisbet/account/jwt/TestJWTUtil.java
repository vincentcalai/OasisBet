package com.oasisbet.account.jwt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.jwt.resource.JwtTokenRequest;

public class TestJWTUtil extends TestWithSpringBoot {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objMapper;

	@Test
	void testLoginSuccess() throws Exception {
		String username = "TESTUSER";
		String password = "password";
		JwtTokenRequest jwtTokenRequest = new JwtTokenRequest(username, password);
		String request = objMapper.writeValueAsString(jwtTokenRequest);
		RequestBuilder requestBuilt = MockMvcRequestBuilders.post("/authenticate").content(request)
				.contentType(MediaType.APPLICATION_JSON);
		this.mockMvc.perform(requestBuilt).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	void testLoginFail_invalidCredentials() throws Exception {
		String username = "TESTUSER";
		String password = "failpassword";
		JwtTokenRequest jwtTokenRequest = new JwtTokenRequest(username, password);
		String request = objMapper.writeValueAsString(jwtTokenRequest);
		RequestBuilder requestBuilt = MockMvcRequestBuilders.post("/authenticate").content(request)
				.contentType(MediaType.APPLICATION_JSON);
		this.mockMvc.perform(requestBuilt).andExpect(MockMvcResultMatchers.status().is(401));
	}

	@Test
	void testLoginFail_userNotFound() throws Exception {
		String username = "UNKNOWN";
		String password = "password";
		JwtTokenRequest jwtTokenRequest = new JwtTokenRequest(username, password);
		String request = objMapper.writeValueAsString(jwtTokenRequest);
		RequestBuilder requestBuilt = MockMvcRequestBuilders.post("/authenticate").content(request)
				.contentType(MediaType.APPLICATION_JSON);
		this.mockMvc.perform(requestBuilt).andExpect(MockMvcResultMatchers.status().is(401));
	}
}
