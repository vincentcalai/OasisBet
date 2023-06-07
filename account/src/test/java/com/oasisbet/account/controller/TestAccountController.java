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
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.service.AccountService;
import com.oasisbet.account.util.Constants;

public class TestAccountController extends TestWithSpringBoot {
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AccountService accountService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	public void testRetrieveAccDetailsSuccess() throws Exception {
		String username = "TESTUSER";

		AccountRestResponse expectedResponse = new AccountRestResponse();
		AccountVO accountVo = new AccountVO();
		accountVo.setUsrId(3L);
		expectedResponse.setAccount(accountVo);

		Mockito.when(accountService.retrieveUserAccountByUsername(Mockito.any(String.class))).thenReturn(accountVo);

		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/account/retrieveAccDetails")
				.contentType(MediaType.APPLICATION_JSON).param("user", username);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

	@Test
	public void testRetrieveAccDetailsFail() throws Exception {
		String username = "TESTUSER";

		AccountRestResponse expectedResponse = new AccountRestResponse();
		expectedResponse.setStatusCode(1);
		expectedResponse.setResultMessage(Constants.ERR_USER_ACC_NOT_FOUND);

		Mockito.when(accountService.retrieveUserAccountByUsername(Mockito.any(String.class))).thenReturn(null);

		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/account/retrieveAccDetails")
				.contentType(MediaType.APPLICATION_JSON).param("user", username);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

	@Test
	public void testRetrieveYtdAmounts() throws Exception {
		Long accId = 100003L;

		AccountRestResponse expectedResponse = new AccountRestResponse();
		AccountVO accountVo = new AccountVO();
		accountVo.setUsrId(3L);
		accountVo.setBalance(20.00);
		accountVo.setYtdDepositAmt(20.00);
		accountVo.setYtdWithdrawalAmt(50.00);
		expectedResponse.setAccount(accountVo);

		Mockito.when(accountService.retrieveYtdAmounts(Mockito.any(Long.class))).thenReturn(accountVo);

		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/account/retrieveYtdAmounts")
				.contentType(MediaType.APPLICATION_JSON).param("accId", String.valueOf(accId));

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}
}
