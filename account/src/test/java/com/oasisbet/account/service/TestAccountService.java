package com.oasisbet.account.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.dao.IAccountBetTrxDao;
import com.oasisbet.account.dao.IAccountOtherTrxDao;
import com.oasisbet.account.model.AccountVO;

public class TestAccountService extends TestWithSpringBoot {

	@Autowired
	AccountService accountService;

	@InjectMocks
	AccountService mockAccountService;

	@Mock
	private IAccountOtherTrxDao accountOtherTrxDao;

	@Mock
	private IAccountBetTrxDao accountBetTrxDao;

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
		when(accountOtherTrxDao.findYtdDeposit(Mockito.any(Long.class), Mockito.any(Date.class)))
				.thenReturn(ytdDepositAmount);
		when(accountOtherTrxDao.findYtdWithdrawal(Mockito.any(Long.class), Mockito.any(Date.class)))
				.thenReturn(ytdWithdrawalAmount);

		AccountVO accountVo = mockAccountService.retrieveYtdAmounts(accId);

		assertEquals(ytdDepositAmount, accountVo.getYtdDepositAmt());
		assertEquals(ytdWithdrawalAmount, accountVo.getYtdWithdrawalAmt());
	}

	@Test
	void testRetrieveYtdAmountsFail() {
		Long accId = 100002L;
		when(accountOtherTrxDao.findYtdDeposit(Mockito.any(Long.class), Mockito.any(Date.class))).thenReturn(null);
		when(accountOtherTrxDao.findYtdWithdrawal(Mockito.any(Long.class), Mockito.any(Date.class))).thenReturn(null);

		AccountVO accountVo = mockAccountService.retrieveYtdAmounts(accId);

		assertEquals(0.0, accountVo.getYtdDepositAmt());
		assertEquals(0.0, accountVo.getYtdWithdrawalAmt());
	}

	@Test
	void testRetrieveMtdAmountsSuccess() throws Exception {
		Long accId = 100002L;
		Double mtdBetAmount = 20.0;
		when(accountBetTrxDao.findMtdBetAmount(Mockito.any(Long.class), Mockito.any(Date.class)))
				.thenReturn(mtdBetAmount);

		AccountVO accountVo = mockAccountService.retrieveMtdAmounts(accId);

		assertEquals(mtdBetAmount, accountVo.getMtdBetAmount());
	}

	@Test
	void testRetrieveMtdAmountsFail() throws Exception {
		Long accId = 100002L;
		when(accountBetTrxDao.findMtdBetAmount(Mockito.any(Long.class), Mockito.any(Date.class))).thenReturn(null);

		AccountVO accountVo = mockAccountService.retrieveMtdAmounts(accId);

		assertEquals(0, accountVo.getMtdBetAmount());
	}

}
