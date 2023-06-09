package com.oasisbet.account.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.dao.IAccountBetProcessTrxDao;
import com.oasisbet.account.dao.IAccountBetTrxDao;
import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IAccountOtherTrxDao;
import com.oasisbet.account.fixture.AccountFixture;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountBetProcessTrxView;
import com.oasisbet.account.view.AccountBetTrxView;
import com.oasisbet.account.view.AccountOtherTrxView;
import com.oasisbet.account.view.AccountView;

public class TestAccountService extends TestWithSpringBoot {

	@Autowired
	private AccountService accountService;

	@InjectMocks
	private AccountService mockAccountService;

	@Autowired
	private IAccountOtherTrxDao accountOtherTrxDao;

	@Autowired
	private IAccountBetTrxDao accountBetTrxDao;

	@Autowired
	private IAccountBetProcessTrxDao accountBetProcessTrxDao;

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
		AccountVO request = AccountFixture.createMockDepositAction();
		request.setDepositAmt(198000.0);

		AccountRestResponse response = accountService.processDepositAction(request);

		assertEquals(1, response.getStatusCode());
		assertEquals(Constants.ERR_MAX_BAL_AMT, response.getResultMessage());
	}

	@Test
	void testProcessDepositActionFail_depositLimitReached() throws Exception {
		AccountVO request = AccountFixture.createMockDepositAction();
		request.setDepositAmt(500.01);

		AccountRestResponse response = accountService.processDepositAction(request);

		assertEquals(2, response.getStatusCode());
		assertEquals(Constants.ERR_OVER_DEPOSIT_LIMIT, response.getResultMessage());
	}

	@Test
	void testProcessDepositActionSuccess() throws Exception {
		AccountVO request = AccountFixture.createMockDepositAction();

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

	@Test
	void testProcessWithdrawalActionFail_ExceedWithdrawalAmt() throws Exception {
		AccountVO request = AccountFixture.createMockWithdrawalAction();
		request.setWithdrawalAmt(2001.00);

		AccountRestResponse response = accountService.processWithdrawalAction(request);

		assertEquals(3, response.getStatusCode());
		assertEquals(Constants.ERR_OVERDRAFT_BAL, response.getResultMessage());
	}

	@Test
	void testProcessWithdrawalActionSuccess() throws Exception {
		AccountVO request = AccountFixture.createMockWithdrawalAction();

		AccountRestResponse response = accountService.processWithdrawalAction(request);
		Optional<AccountView> optionalAccView = accountDao.findById(request.getAccId());
		AccountView view = optionalAccView.get();

		Optional<AccountOtherTrxView> optionalTrxView = accountOtherTrxDao.findById("W/100002/100051");
		AccountOtherTrxView trxView = optionalTrxView.get();

		assertEquals(1440.00, view.getBalance());
		assertEquals(100002L, trxView.getAccId());
		assertEquals(560.00, trxView.getAmount());
		assertEquals("W", trxView.getType());
		assertEquals(0, response.getStatusCode());
		assertEquals(Constants.WITHDRAW_ACC_SUCCESS, response.getResultMessage());
	}

	@Test
	void testProcessBetFail_userNotFound() throws Exception {
		Long userId = 100004L;
		List<BetSubmissionVO> betSubmissionList = AccountFixture.createMockBetSubmissionData();
		StatusResponse response = accountService.processBet(userId, betSubmissionList);

		assertEquals(1, response.getStatusCode());
		assertEquals(Constants.ERR_USER_ACC_NOT_FOUND, response.getResultMessage());
	}

	@Test
	void testProcessBetFail_insufficientBalanace() throws Exception {
		Long userId = 100001L;
		List<BetSubmissionVO> betSubmissionList = AccountFixture.createMockBetSubmissionData();
		StatusResponse response = accountService.processBet(userId, betSubmissionList);

		assertEquals(2, response.getStatusCode());
		assertEquals(Constants.ERR_INSUFFICIENT_BAL, response.getResultMessage());
	}

	@Test
	void testProcessBetSuccess() throws Exception {
		Long userId = 100002L;
		List<BetSubmissionVO> betSubmissionList = AccountFixture.createMockBetSubmissionData();
		StatusResponse response = accountService.processBet(userId, betSubmissionList);

		Optional<AccountBetTrxView> optionalBetTrxView1 = accountBetTrxDao.findById("B/100002/100051");
		AccountBetTrxView betTrxView1 = optionalBetTrxView1.get();
		Optional<AccountBetTrxView> optionalBetTrxView2 = accountBetTrxDao.findById("B/100002/100052");
		AccountBetTrxView betTrxView2 = optionalBetTrxView2.get();
		Optional<AccountBetTrxView> optionalBetTrxView3 = accountBetTrxDao.findById("B/100002/100053");
		AccountBetTrxView betTrxView3 = optionalBetTrxView3.get();

		Optional<AccountBetProcessTrxView> optionalBetProcessTrxView1 = accountBetProcessTrxDao
				.findByTrxId("B/100002/100051");
		AccountBetProcessTrxView betProcessTrxView1 = optionalBetProcessTrxView1.get();
		Optional<AccountBetProcessTrxView> optionalBetProcessTrxView2 = accountBetProcessTrxDao
				.findByTrxId("B/100002/100052");
		AccountBetProcessTrxView betProcessTrxView2 = optionalBetProcessTrxView2.get();
		Optional<AccountBetProcessTrxView> optionalBetProcessTrxView3 = accountBetProcessTrxDao
				.findByTrxId("B/100002/100053");
		AccountBetProcessTrxView betProcessTrxView3 = optionalBetProcessTrxView3.get();

		assertEquals(1.00, betTrxView1.getBetAmount());
		assertEquals(2.00, betTrxView2.getBetAmount());
		assertEquals(2.00, betTrxView3.getBetAmount());
		assertEquals(4.05, betTrxView1.getPotentialReturn());
		assertEquals(2.90, betTrxView2.getPotentialReturn());
		assertEquals(7.10, betTrxView3.getPotentialReturn());
		assertEquals("B", betProcessTrxView1.getType());
		assertEquals("B", betProcessTrxView2.getType());
		assertEquals("B", betProcessTrxView3.getType());
		assertEquals(1.00, betProcessTrxView1.getAmount());
		assertEquals(2.00, betProcessTrxView2.getAmount());
		assertEquals(2.00, betProcessTrxView3.getAmount());
		assertEquals(0, response.getStatusCode());
	}

}
