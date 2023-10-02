package com.oasisbet.betting.controller;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.fixture.BettingFixture;
import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.AccountRestResponse;
import com.oasisbet.betting.odds.model.response.StatusResponse;
import com.oasisbet.betting.odds.proxy.AccountProxy;
import com.oasisbet.betting.odds.service.OddsService;
import com.oasisbet.betting.odds.util.Constants;

@ExtendWith(MockitoExtension.class)
class TestOddsController extends TestBaseSetup {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private OddsService oddsService;

	@MockBean
	private AccountProxy proxy;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void testRetrieveOddsSuccess() throws JsonProcessingException, Exception {
		String compType = "soccer_epl";
		List<BetEvent> betEvents = BettingFixture.createMockOddsData();

		StatusResponse expectedResponse = new StatusResponse();

		Mockito.when(oddsService.retrieveBetEventByCompType(Mockito.anyString())).thenReturn(betEvents);

		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/odds/retrieveOdds")
				.param("compType", compType).contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(expectedResponse)));
	}

	@Test
	void testSubmitBetSuccess() throws Exception {
		BetSlipRest betsInput = BettingFixture.createMockBetSubmissionData();

		AccountRestResponse expectedResponse = new AccountRestResponse();

		Mockito.when(proxy.processBet(Mockito.any(BetSlipRest.class))).thenReturn(expectedResponse);

		String request = objectMapper.writeValueAsString(betsInput);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/odds/bets")
				.contentType(MediaType.APPLICATION_JSON).content(request);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

	@Test
	void testSubmitBetFail() throws Exception {
		BetSlipRest betsInput = BettingFixture.createMockBetSubmissionData();

		StatusResponse expectedResponse = new StatusResponse();
		expectedResponse.setStatusCode(1);
		expectedResponse.setResultMessage(Constants.BET_PROCESS_ERROR);

		Mockito.when(proxy.processBet(Mockito.any(BetSlipRest.class))).thenThrow(new Exception());

		String request = objectMapper.writeValueAsString(betsInput);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/odds/bets")
				.contentType(MediaType.APPLICATION_JSON).content(request);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

}
