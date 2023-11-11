package com.oasisbet.account.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.math.BigInteger;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.dao.IAccountBetProcessTrxDao;
import com.oasisbet.account.dao.IAccountBetTrxDao;
import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IAccountOtherTrxDao;
import com.oasisbet.account.fixture.AccountFixture;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.ResultEventMapping;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.TrxHistVO;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.proxy.ResultProxy;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountBetProcessTrxView;
import com.oasisbet.account.view.AccountBetTrxView;
import com.oasisbet.account.view.AccountOtherTrxView;
import com.oasisbet.account.view.AccountView;

class TestAccountService extends TestWithSpringBoot {

	@Autowired
	private AccountService accountService;

	@InjectMocks
	@Spy
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

	@MockBean
	private ResultProxy proxy;

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
		assertEquals(500.00, view.getDepositLimit());
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

	@Test
	void testRetrieveTrxHistAllFunds() throws Exception {
		Long accId = 100002L;
		String type = "funds";
		String period = "last6mth";

		LocalDate localDate = LocalDate.of(2023, 1, 1);
		Calendar calendar = Calendar.getInstance();
		calendar.set(localDate.getYear(), localDate.getMonthValue() - 1, localDate.getDayOfMonth());
		Date date = calendar.getTime();

		Mockito.doReturn(date).when(mockAccountService).genStartDate(anyString());

		List<Object[]> trxList = AccountFixture.createMockAllFundsTrxList();

		Mockito.when(mockAccountOtherTrxDao.getAllFundsInOutTrx(anyLong(), any(Date.class))).thenReturn(trxList);

		List<TrxHistVO> list = mockAccountService.retrieveTrxHist(accId, type, period);

		Mockito.verify(mockAccountOtherTrxDao).getAllFundsInOutTrx(eq(accId), eq(date));
		assertEquals(3, list.size());
	}

	@Test
	void testRetrieveTrxHistDeposit() throws Exception {
		Long accId = 100002L;
		String type = "deposit";
		String typeCd = "D";
		String period = "last6mth";

		LocalDate localDate = LocalDate.of(2023, 1, 1);
		Calendar calendar = Calendar.getInstance();
		calendar.set(localDate.getYear(), localDate.getMonthValue() - 1, localDate.getDayOfMonth());
		Date date = calendar.getTime();

		Mockito.doReturn(date).when(mockAccountService).genStartDate(anyString());

		List<AccountOtherTrxView> trxList = new ArrayList<>();
		AccountOtherTrxView trx1 = new AccountOtherTrxView();
		trx1.setAccId(100000L);
		trx1.setAmount(10.00);
		trx1.setTrxDt(new Date());
		trx1.setTrxId("D/100000/100034");
		trx1.setType("D");
		AccountOtherTrxView trx2 = new AccountOtherTrxView();
		trx2.setAccId(100000L);
		trx2.setAmount(20.00);
		trx2.setTrxDt(new Date());
		trx2.setTrxId("D/100000/100035");
		trx2.setType("D");
		trxList.add(trx1);
		trxList.add(trx2);
		Mockito.when(this.mockAccountOtherTrxDao.getByTypeByDateRange(anyLong(), anyString(), any(Date.class)))
				.thenReturn(trxList);

		List<TrxHistVO> list = mockAccountService.retrieveTrxHist(accId, type, period);

		Mockito.verify(mockAccountOtherTrxDao).getByTypeByDateRange(eq(accId), eq(typeCd), eq(date));
		assertEquals(2, list.size());
	}

	@Test
	void testRetrieveTrxHistWithdrawal() throws Exception {
		Long accId = 100002L;
		String type = "withdrawal";
		String typeCd = "W";
		String period = "last6mth";

		LocalDate localDate = LocalDate.of(2023, 1, 1);
		Calendar calendar = Calendar.getInstance();
		calendar.set(localDate.getYear(), localDate.getMonthValue() - 1, localDate.getDayOfMonth());
		Date date = calendar.getTime();

		Mockito.doReturn(date).when(mockAccountService).genStartDate(anyString());

		List<AccountOtherTrxView> trxList = new ArrayList<>();
		AccountOtherTrxView trx1 = new AccountOtherTrxView();
		trx1.setAccId(100000L);
		trx1.setAmount(10.00);
		trx1.setTrxDt(new Date());
		trx1.setTrxId("W/100000/100034");
		trx1.setType("W");
		AccountOtherTrxView trx2 = new AccountOtherTrxView();
		trx2.setAccId(100000L);
		trx2.setAmount(20.00);
		trx2.setTrxDt(new Date());
		trx2.setTrxId("W/100000/100035");
		trx2.setType("W");
		trxList.add(trx1);
		trxList.add(trx2);
		Mockito.when(this.mockAccountOtherTrxDao.getByTypeByDateRange(anyLong(), anyString(), any(Date.class)))
				.thenReturn(trxList);

		List<TrxHistVO> list = mockAccountService.retrieveTrxHist(accId, type, period);

		Mockito.verify(mockAccountOtherTrxDao).getByTypeByDateRange(eq(accId), eq(typeCd), eq(date));
		assertEquals(2, list.size());
	}

	@Test
	void testRetrieveTrxHistSportsBet() throws Exception {
		Long accId = 100002L;
		String type = "sportsbet";
		String period = "last6mth";

		LocalDate localDate = LocalDate.of(2023, 1, 1);
		Calendar calendar = Calendar.getInstance();
		calendar.set(localDate.getYear(), localDate.getMonthValue() - 1, localDate.getDayOfMonth());
		Date date = calendar.getTime();

		Mockito.doReturn(date).when(mockAccountService).genStartDate(anyString());

		List<AccountBetTrxView> trxList = AccountFixture.createMockSportsBetTrxList(accId);

		Mockito.when(this.mockAccountBetTrxDao.getByDateRange(anyLong(), any(Date.class))).thenReturn(trxList);

		List<TrxHistVO> list = mockAccountService.retrieveTrxHist(accId, type, period);

		Mockito.verify(mockAccountBetTrxDao).getByDateRange(eq(accId), eq(date));
		assertEquals(6, list.size());
	}

	@Test
	void testGenStartDateFail_InvalidPeriod() throws Exception {
		String period = "invalid";
		assertThrows(IllegalArgumentException.class, () -> accountService.genStartDate(period));
	}

	@Test
	void testGenStartDateTodayDate() throws Exception {
		String period = "today";
		LocalDate today = LocalDate.now();
		LocalDateTime startOfDay = today.atStartOfDay();
		Date expectedResult = Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
		Date result = accountService.genStartDate(period);
		assertEquals(expectedResult.getDate(), result.getDate());
	}

	@Test
	void testGenStartDateLast7Days() throws Exception {
		String period = "last7day";
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, -6);
		Date expectedResult = calendar.getTime();
		Date result = accountService.genStartDate(period);
		assertEquals(expectedResult.getDate(), result.getDate());
	}

	@Test
	void testGenStartDateLast1Month() throws Exception {
		String period = "last1mth";
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -1);
		Date expectedResult = calendar.getTime();
		Date result = accountService.genStartDate(period);
		assertEquals(expectedResult.getDate(), result.getDate());
	}

	@Test
	void testGenStartDateLast3Month() throws Exception {
		String period = "last3mth";
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -3);
		Date expectedResult = calendar.getTime();
		Date result = accountService.genStartDate(period);
		assertEquals(expectedResult.getDate(), result.getDate());
	}

	@Test
	void testGenStartDateLast6Month() throws Exception {
		String period = "last6mth";
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -6);
		Date expectedResult = calendar.getTime();
		Date result = accountService.genStartDate(period);
		assertEquals(expectedResult.getDate(), result.getDate());
	}

	@Test
	void testRetrieveNotSettledBetTrx() throws Exception {
		List<AccountBetTrxView> accountBetTrxList = accountService.retrieveNotSettledBetTrx();
		assertEquals(26, accountBetTrxList.size());
	}

	@Test
	void testProcessChangeLimitActionSuccess() throws Exception {
		AccountVO request = AccountFixture.createMockChangeLimitAction();

		AccountRestResponse response = accountService.processLimitAction(request);
		Optional<AccountView> optionalAccView = accountDao.findById(request.getAccId());
		AccountView view = optionalAccView.get();

		assertEquals(100002L, view.getAccId());
		assertEquals(800.00, view.getDepositLimit());
		assertEquals(1200.00, view.getBetLimit());
		assertEquals(0, response.getStatusCode());
		assertEquals(Constants.CHANGE_LIMIT_ACC_SUCCESS, response.getResultMessage());
	}

	@Test
	void testUpdateBetTrxSettlementStatusAndDateSuccess() throws Exception {
		AccountBetTrxView request = AccountFixture.createMockBetTransaction();
		request.setSettled(true);
		request.setSettledDateTime(new Date());

		accountService.updateBetTrx(request);
		Optional<AccountBetTrxView> optionalAccBetTrxView = accountBetTrxDao.findById(request.getTrxId());
		AccountBetTrxView view = optionalAccBetTrxView.get();

		long expectedTime = request.getSettledDateTime().getTime();
		long actualTime = view.getSettledDateTime().getTime();
		long timeDiff = Math.abs(actualTime - expectedTime);

		assertEquals(100002L, view.getAccId());
		assertTrue(view.getSettled());
		assertTrue(timeDiff < 1000);
	}

	@Test
	void testProcess1X2BetTrxSettlement() throws ParseException {
		double potentialReturn = 14.05;
		double balance = 960.00;
		double expectedNewBalance = balance + potentialReturn;
		String expectedWinType = "C";
		String newTrxId = "C/100002/100051";

		AccountBetTrxView request = AccountFixture.createMockBetTransaction();

		accountService.process1X2BetTrxSettlement(request);

		Optional<AccountView> optionalAccView = accountDao.findById(request.getAccId());
		AccountView accountView = optionalAccView.get();

		Optional<AccountBetProcessTrxView> optionalAccBetProcessTrxView = accountBetProcessTrxDao.findById(5L);
		AccountBetProcessTrxView accountBetProcessTrxView = optionalAccBetProcessTrxView.get();

		assertEquals(newTrxId, accountBetProcessTrxView.getTrxId());
		assertEquals(expectedWinType, accountBetProcessTrxView.getType());
		assertEquals(potentialReturn, accountBetProcessTrxView.getAmount());

		assertEquals(100002L, accountView.getAccId());
		assertEquals(expectedNewBalance, accountView.getBalance());
	}

	@Test
	void testRetrieveCompletedResultMapSuccess() throws Exception {
		List<ResultEventMapping> mockCompletedResults = AccountFixture.createMockEplResultEventMapping();
		Mockito.when(proxy.retrieveCompletedResults()).thenReturn(mockCompletedResults);

		Map<BigInteger, ResultEventMapping> completedResultsMap = accountService.retrieveCompletedResults();

		assertEquals(3, completedResultsMap.size());
		assertTrue(completedResultsMap.containsKey(BigInteger.valueOf(100000L)));
		assertTrue(completedResultsMap.containsKey(BigInteger.valueOf(100001L)));
		assertTrue(completedResultsMap.containsKey(BigInteger.valueOf(100002L)));
	}

}
