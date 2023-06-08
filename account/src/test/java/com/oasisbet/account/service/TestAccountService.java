package com.oasisbet.account.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.dao.IAccountBetTrxDao;
import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IAccountOtherTrxDao;
import com.oasisbet.account.fixture.AccountFixture;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountOtherTrxView;
import com.oasisbet.account.view.AccountView;

public class TestAccountService extends TestWithSpringBoot {

	@Autowired
	private AccountService accountService;

	@InjectMocks
	private AccountService mockAccountService;

	@Autowired
	private IAccountOtherTrxDao accountOtherTrxDao;

	@Mock
	private IAccountOtherTrxDao mockAccountOtherTrxDao;

	@Mock
	private IAccountBetTrxDao mockAccountBetTrxDao;

	@Autowired
	private IAccountDao accountDao;

	@Test
	void testRetrieveUserAccountByUsernameSuccess() {
		String user = "TESTUSER";
		AccountVO accountVo = accountService.retrieveUserAccountByUsername(user);
		assertEquals(100002L, accountVo.getAccId());
	}

	@Test
	void testRetrieveUserAccountByUsernameUserAccountNotFound() {
		String user = "NOTEXISTUSER";
		AccountVO accountVo = accountService.retrieveUserAccountByUsername(user);
		assertEquals(null, accountVo);
	}

	@Test
	void testRetrieveUserAccountByUsernameBettingAccountNotFound() {
		String user = "TESTUSERA";
		AccountVO accountVo = accountService.retrieveUserAccountByUsername(user);
		assertEquals(null, accountVo);
	}

	@Test
	void testRetrieveYtdAmountsSuccess() {
		Long accId = 100002L;
		Double ytdDepositAmount = 100.0;
		Double ytdWithdrawalAmount = 50.0;
		when(mockAccountOtherTrxDao.findYtdDeposit(Mockito.any(Long.class), Mockito.any(Date.class)))
				.thenReturn(ytdDepositAmount);
		when(mockAccountOtherTrxDao.findYtdWithdrawal(Mockito.any(Long.class), Mockito.any(Date.class)))
				.thenReturn(ytdWithdrawalAmount);

		AccountVO accountVo = mockAccountService.retrieveYtdAmounts(accId);

		assertEquals(ytdDepositAmount, accountVo.getYtdDepositAmt());
		assertEquals(ytdWithdrawalAmount, accountVo.getYtdWithdrawalAmt());
	}

	@Test
	void testRetrieveYtdAmountsFail() {
		Long accId = 100002L;
		when(mockAccountOtherTrxDao.findYtdDeposit(Mockito.any(Long.class), Mockito.any(Date.class))).thenReturn(null);
		when(mockAccountOtherTrxDao.findYtdWithdrawal(Mockito.any(Long.class), Mockito.any(Date.class)))
				.thenReturn(null);

		AccountVO accountVo = mockAccountService.retrieveYtdAmounts(accId);

		assertEquals(0.0, accountVo.getYtdDepositAmt());
		assertEquals(0.0, accountVo.getYtdWithdrawalAmt());
	}

	@Test
	void testRetrieveMtdAmountsSuccess() throws Exception {
		Long accId = 100002L;
		Double mtdBetAmount = 20.0;
		when(mockAccountBetTrxDao.findMtdBetAmount(Mockito.any(Long.class), Mockito.any(Date.class)))
				.thenReturn(mtdBetAmount);

		AccountVO accountVo = mockAccountService.retrieveMtdAmounts(accId);

		assertEquals(mtdBetAmount, accountVo.getMtdBetAmount());
	}

	@Test
	void testRetrieveMtdAmountsFail() throws Exception {
		Long accId = 100002L;
		when(mockAccountBetTrxDao.findMtdBetAmount(Mockito.any(Long.class), Mockito.any(Date.class))).thenReturn(null);

		AccountVO accountVo = mockAccountService.retrieveMtdAmounts(accId);

		assertEquals(0, accountVo.getMtdBetAmount());
	}

	@Test
	void testProcessDepositActionFail_maxBalance() throws Exception {
		AccountVO request = AccountFixture.createMockAccountVO();
		request.setDepositAmt(198000.0);

		AccountRestResponse response = accountService.processDepositAction(request);

		assertEquals(1, response.getStatusCode());
		assertEquals(Constants.ERR_MAX_BAL_AMT, response.getResultMessage());
	}

	@Test
	void testProcessDepositActionFail_depositLimitReached() throws Exception {
		AccountVO request = AccountFixture.createMockAccountVO();
		request.setDepositAmt(500.01);

		AccountRestResponse response = accountService.processDepositAction(request);

		assertEquals(2, response.getStatusCode());
		assertEquals(Constants.ERR_OVER_DEPOSIT_LIMIT, response.getResultMessage());
	}

	@Test
	void testProcessDepositActionSuccess() throws Exception {
		AccountVO request = AccountFixture.createMockAccountVO();

		AccountRestResponse response = accountService.processDepositAction(request);
		Optional<AccountView> optionalAccView = accountDao.findById(request.getAccId());
		AccountView view = optionalAccView.get();

		Optional<AccountOtherTrxView> optionalTrxView = accountOtherTrxDao.findById("D/100002/100051");
		AccountOtherTrxView trxView = optionalTrxView.get();

		assertEquals(2100.00, view.getBalance());
		assertEquals(400.00, view.getDepositLimit());
		assertEquals(100002L, trxView.getAccId());
		assertEquals(100.00, trxView.getAmount());
		assertEquals("D", trxView.getType());
		assertEquals(0, response.getStatusCode());
		assertEquals(Constants.DEPOSIT_ACC_SUCCESS, response.getResultMessage());
	}

}
