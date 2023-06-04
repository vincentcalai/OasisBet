package com.oasisbet.betting.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.oasisbet.betting.TestBaseSetup;
import com.oasisbet.betting.odds.controller.OddsController;
import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.StatusResponse;
import com.oasisbet.betting.proxy.AccountProxy;

@ExtendWith(MockitoExtension.class)
public class TestOddsController extends TestBaseSetup {
	@InjectMocks
	private OddsController oddsController;

	@Mock
	private AccountProxy proxy;

	@Test
	public void testSubmitBet() {
		StatusResponse mockResponse = new StatusResponse();
		when(proxy.processBet(any(BetSlipRest.class))).thenReturn(mockResponse);
		BetSlipRest betSlip = new BetSlipRest();
		StatusResponse response = oddsController.submitBet(betSlip);
		assertEquals(0, response.getStatusCode());
	}
}
