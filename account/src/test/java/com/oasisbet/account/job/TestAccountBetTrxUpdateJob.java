package com.oasisbet.account.job;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.fixture.AccountFixture;
import com.oasisbet.account.service.AccountService;
import com.oasisbet.account.util.AccountBetTrxUpdateJob;
import com.oasisbet.account.view.AccountBetTrxView;

@ExtendWith(MockitoExtension.class)
class TestAccountBetTrxUpdateJob extends TestWithSpringBoot {

	@Autowired
	private AccountBetTrxUpdateJob accountBetTrxUpdateJob;

	@MockBean
	private AccountService accountService;

	@Test
	void testUpdateBetTrxUpdate1X2WinResultsProcess2TimesSuccess() throws Exception {
		// populate 3 results into map
		when(accountService.retrieveCompletedResults()).thenReturn(AccountFixture.createMockMapEplResultEventMapping());
		when(accountService.retrieveNotSettledBetTrx()).thenReturn(AccountFixture.createMockBetTransactionsList());

		accountBetTrxUpdateJob.execute(null);

		// process 2 times - only 2 results with bet selection matching result outcome
		verify(accountService, times(2)).process1X2BetTrxSettlement(Mockito.any(AccountBetTrxView.class));
		verify(accountService, times(3)).updateBetTrx(Mockito.any(AccountBetTrxView.class));
	}

	@Test
	void testUpdateBetTrxUpdateJobThrowUnkownExceptionFail() throws Exception {
		when(accountService.retrieveCompletedResults()).thenThrow(Exception.class);

		accountBetTrxUpdateJob.execute(null);

		verify(accountService, times(0)).process1X2BetTrxSettlement(Mockito.any(AccountBetTrxView.class));
		verify(accountService, times(0)).updateBetTrx(Mockito.any(AccountBetTrxView.class));
	}

}
