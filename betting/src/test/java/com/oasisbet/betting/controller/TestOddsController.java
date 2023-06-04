package com.oasisbet.betting.controller;

import java.util.ArrayList;
import java.util.Date;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.odds.model.BetSubmissionVO;
import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.StatusResponse;
import com.oasisbet.betting.proxy.AccountProxy;
import com.oasisbet.betting.util.Constants;

@ExtendWith(MockitoExtension.class)
public class TestOddsController extends TestBaseSetup {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AccountProxy proxy;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void testSubmitBetSuccess() throws Exception {
		BetSlipRest betsInput = mockBetSubmissionData();

		StatusResponse expectedResponse = new StatusResponse();

		Mockito.when(proxy.processBet(Mockito.any(BetSlipRest.class))).thenReturn(expectedResponse);

		String request = objectMapper.writeValueAsString(betsInput);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/odds/bets")
				.contentType(MediaType.APPLICATION_JSON).content(request);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

	@Test
	public void testSubmitBetFail() throws Exception {
		BetSlipRest betsInput = mockBetSubmissionData();

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

	private BetSlipRest mockBetSubmissionData() {
		BetSlipRest betsInput = new BetSlipRest();
		betsInput.setUserId(22L);
		List<BetSubmissionVO> betSubmissionVOlist = new ArrayList<>();
		BetSubmissionVO betSubmission = new BetSubmissionVO();
		betSubmission.setEventId(1000001L);
		betSubmission.setBetAmount(1.00);
		betSubmission.setBetSelection("01");
		betSubmission.setBetSelectionName("Manchester United");
		betSubmission.setBetTypeCd("01");
		betSubmission.setCompType("soccer_epl");
		betSubmission.setEventDesc("Manchester City vs Manchester United");
		betSubmission.setOdds(4.05);
		betSubmission.setPotentialPayout(4.05);
		betSubmission.setStartTime(new Date());
		betSubmissionVOlist.add(betSubmission);
		betsInput.setBetSlip(betSubmissionVOlist);
		return betsInput;
	}
}
