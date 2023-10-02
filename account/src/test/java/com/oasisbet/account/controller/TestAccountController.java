package com.oasisbet.account.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

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
import com.oasisbet.account.fixture.AccountFixture;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.TrxHistVO;
import com.oasisbet.account.model.request.AccountRest;
import com.oasisbet.account.model.request.BetSlipRest;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.model.response.TrxHistRestResponse;
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

	@Test
	public void testRetrieveMtdAmounts() throws Exception {
		Long accId = 100003L;

		AccountRestResponse expectedResponse = new AccountRestResponse();
		AccountVO accountVo = new AccountVO();
		accountVo.setUsrId(3L);
		accountVo.setBalance(20.00);
		accountVo.setMtdBetAmount(35.00);
		accountVo.setMthPayout(48.00);
		expectedResponse.setAccount(accountVo);

		Mockito.when(accountService.retrieveMtdAmounts(Mockito.any(Long.class))).thenReturn(accountVo);

		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/account/retrieveMtdAmounts")
				.contentType(MediaType.APPLICATION_JSON).param("accId", String.valueOf(accId));

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

	@Test
	public void testRetrieveTrx() throws Exception {
		Long accId = 100003L;
		String type = "F";
		String period = "last1mth";

		String dateString = "2023-05-31"; // The desired date in string format
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

		TrxHistRestResponse expectedResponse = new TrxHistRestResponse();
		List<TrxHistVO> trxHistVoList = new ArrayList<>();
		TrxHistVO trxHistVo = new TrxHistVO();
		trxHistVo.setAmount(20.00);
		trxHistVo.setDateTime(dateFormat.parse(dateString));
		trxHistVo.setDesc("Test Description");
		trxHistVoList.add(trxHistVo);
		expectedResponse.setTrxHistList(trxHistVoList);

		Mockito.when(accountService.retrieveTrxHist(Mockito.any(Long.class), Mockito.any(String.class),
				Mockito.any(String.class))).thenReturn(trxHistVoList);

		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/account/retrieveTrx")
				.contentType(MediaType.APPLICATION_JSON).param("accId", String.valueOf(accId))
				.param("type", String.valueOf(type)).param("period", String.valueOf(period));

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

	@Test
	public void testUpdateAccDetailsOnDeposit() throws Exception {

		AccountRest accountRest = new AccountRest();
		AccountVO accountVo = new AccountVO();
		accountVo.setAccId(100003L);
		accountVo.setActionType("D");
		accountRest.setAccount(accountVo);

		AccountRestResponse expectedResponse = new AccountRestResponse();
		Mockito.when(accountService.processDepositAction(Mockito.any(AccountVO.class))).thenReturn(expectedResponse);

		String request = objectMapper.writeValueAsString(accountRest);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.put("/account/updateAccDetails")
				.contentType(MediaType.APPLICATION_JSON).content(request);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
		verify(accountService, times(1)).processDepositAction(Mockito.any(AccountVO.class));
	}

	@Test
	public void testUpdateAccDetailsOnWithdrawal() throws Exception {

		AccountRest accountRest = new AccountRest();
		AccountVO accountVo = new AccountVO();
		accountVo.setAccId(100003L);
		accountVo.setActionType("W");
		accountRest.setAccount(accountVo);

		AccountRestResponse expectedResponse = new AccountRestResponse();
		Mockito.when(accountService.processWithdrawalAction(Mockito.any(AccountVO.class))).thenReturn(expectedResponse);

		String request = objectMapper.writeValueAsString(accountRest);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.put("/account/updateAccDetails")
				.contentType(MediaType.APPLICATION_JSON).content(request);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
		verify(accountService, times(1)).processWithdrawalAction(Mockito.any(AccountVO.class));
	}

	@SuppressWarnings("unchecked")
	@Test
	public void testProcessBet() throws Exception {

		BetSlipRest betSlipRest = AccountFixture.createMockBetSubmissionRestData();

		AccountRestResponse expectedResponse = new AccountRestResponse();
		Mockito.when(accountService.processBet(Mockito.any(Long.class), Mockito.any(List.class)))
				.thenReturn(expectedResponse);

		String request = objectMapper.writeValueAsString(betSlipRest);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/account/processBet")
				.contentType(MediaType.APPLICATION_JSON).content(request);

		String response = objectMapper.writeValueAsString(expectedResponse);
		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(response));
	}

}
