package com.oasisbet.account.fixture;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.ResultEventMapping;
import com.oasisbet.account.model.UpdateAccountInfoVO;
import com.oasisbet.account.model.request.BetSlipRest;
import com.oasisbet.account.model.request.UpdateAccountInfoRest;
import com.oasisbet.account.view.AccountBetProcessTrxView;
import com.oasisbet.account.view.AccountBetTrxView;
import com.oasisbet.account.view.UserView;

public class AccountFixture {
	public static BetSlipRest createMockBetSubmissionRestData() {
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

	public static List<BetSubmissionVO> createMockBetSubmissionData() {
		List<BetSubmissionVO> betSubmissionVOlist = new ArrayList<>();

		BetSubmissionVO betSubmission = new BetSubmissionVO();
		betSubmission.setEventId(1000001L);
		betSubmission.setBetAmount(1.00);
		betSubmission.setBetSelection("03");
		betSubmission.setBetSelectionName("Manchester United");
		betSubmission.setBetTypeCd("01");
		betSubmission.setCompType("soccer_epl");
		betSubmission.setEventDesc("Manchester City vs Manchester United");
		betSubmission.setOdds(4.05);
		betSubmission.setPotentialPayout(4.05);
		betSubmission.setStartTime(new Date());

		BetSubmissionVO betSubmission2 = new BetSubmissionVO();
		betSubmission2.setEventId(1000002L);
		betSubmission2.setBetAmount(2.00);
		betSubmission2.setBetSelection("03");
		betSubmission2.setBetSelectionName("Liverpool");
		betSubmission2.setBetTypeCd("01");
		betSubmission2.setCompType("soccer_epl");
		betSubmission2.setEventDesc("Everton vs Liverpool");
		betSubmission2.setOdds(1.45);
		betSubmission2.setPotentialPayout(2.90);
		betSubmission2.setStartTime(new Date());

		BetSubmissionVO betSubmission3 = new BetSubmissionVO();
		betSubmission3.setEventId(1000003L);
		betSubmission3.setBetAmount(2.00);
		betSubmission3.setBetSelection("02");
		betSubmission3.setBetSelectionName("Draw");
		betSubmission3.setBetTypeCd("01");
		betSubmission3.setCompType("soccer_epl");
		betSubmission3.setEventDesc("Tottenham Hotspur vs West Ham United");
		betSubmission3.setOdds(3.55);
		betSubmission3.setPotentialPayout(7.10);
		betSubmission3.setStartTime(new Date());

		betSubmissionVOlist.add(betSubmission);
		betSubmissionVOlist.add(betSubmission2);
		betSubmissionVOlist.add(betSubmission3);
		return betSubmissionVOlist;
	}

	public static AccountVO createMockDepositAction() {
		AccountVO accountVo = new AccountVO();
		accountVo.setAccId(100002L);
		accountVo.setActionType("D");
		accountVo.setBalance(2000.00);
		accountVo.setDepositAmt(100.00);
		accountVo.setDepositLimit(500.00);
		accountVo.setBetLimit(500.00);
		accountVo.setMtdBetAmount(58.88);
		accountVo.setMthPayout(62.99);
		accountVo.setUsrId(1L);
		accountVo.setYtdDepositAmt(399.10);
		accountVo.setYtdWithdrawalAmt(672.50);
		return accountVo;
	}

	public static AccountVO createMockWithdrawalAction() {
		AccountVO accountVo = new AccountVO();
		accountVo.setAccId(100002L);
		accountVo.setActionType("W");
		accountVo.setBalance(2000.00);
		accountVo.setDepositLimit(500.00);
		accountVo.setBetLimit(200.00);
		accountVo.setMtdBetAmount(58.88);
		accountVo.setMthPayout(62.99);
		accountVo.setUsrId(1L);
		accountVo.setWithdrawalAmt(560.00);
		accountVo.setYtdDepositAmt(399.10);
		accountVo.setYtdWithdrawalAmt(672.50);
		return accountVo;
	}

	public static AccountVO createMockChangeLimitAction() {
		AccountVO accountVo = new AccountVO();
		accountVo.setAccId(100002L);
		accountVo.setActionType("L");
		accountVo.setBalance(2000.00);
		accountVo.setDepositLimit(800.00);
		accountVo.setBetLimit(1200.00);
		accountVo.setUsrId(1L);
		return accountVo;
	}

	public static AccountBetTrxView createMockBetTransaction() throws ParseException {
		String trxDateTimeStr = "2023-05-31 11:25:49";
		String startTimeStr = "2023-04-28 03:15:00";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date trxDateTime = formatter.parse(trxDateTimeStr);
		Date startTime = formatter.parse(startTimeStr);

		AccountBetTrxView accountBetTrx = new AccountBetTrxView();
		accountBetTrx.setAccId(100002L);
		accountBetTrx.setBetAmount(5.00);
		accountBetTrx.setBetSelection("01");
		accountBetTrx.setBetType("01");
		accountBetTrx.setCompType("EPL");
		accountBetTrx.setEventDesc("Tottenham Hotspur vs Manchester United");
		accountBetTrx.setEventId(100000L);
		accountBetTrx.setOdds(2.81);
		accountBetTrx.setPotentialReturn(14.05);
		accountBetTrx.setSettled(false);
		accountBetTrx.setSettledDateTime(null);
		accountBetTrx.setStartTime(startTime);
		accountBetTrx.setTrxDateTime(trxDateTime);
		accountBetTrx.setTrxId("B/100002/100037");
		return accountBetTrx;
	}

	public static List<AccountBetTrxView> createMockBetTransactionsList() throws ParseException {
		List<AccountBetTrxView> accountBetTrxList = new ArrayList<>();

		String trxDateTimeStr = "2023-05-31 11:25:49";
		String startTimeStr = "2023-04-28 03:15:00";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date trxDateTime = formatter.parse(trxDateTimeStr);
		Date startTime = formatter.parse(startTimeStr);

		AccountBetTrxView accountBetTrx = new AccountBetTrxView();
		accountBetTrx.setAccId(100002L);
		accountBetTrx.setBetAmount(5.00);
		accountBetTrx.setBetSelection("01");
		accountBetTrx.setBetType("01");
		accountBetTrx.setCompType("EPL");
		accountBetTrx.setEventDesc("Tottenham Hotspur vs Manchester United");
		accountBetTrx.setEventId(100000L);
		accountBetTrx.setOdds(2.81);
		accountBetTrx.setPotentialReturn(14.05);
		accountBetTrx.setSettled(false);
		accountBetTrx.setSettledDateTime(null);
		accountBetTrx.setStartTime(startTime);
		accountBetTrx.setTrxDateTime(trxDateTime);
		accountBetTrx.setTrxId("B/100002/100037");

		String trxDateTimeStr2 = "2023-05-31 11:25:49";
		String startTimeStr2 = "2023-04-29 02:45:00";
		SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date trxDateTime2 = formatter2.parse(trxDateTimeStr2);
		Date startTime2 = formatter2.parse(startTimeStr2);

		AccountBetTrxView accountBetTrx2 = new AccountBetTrxView();
		accountBetTrx2.setAccId(100002L);
		accountBetTrx2.setBetAmount(9.00);
		accountBetTrx2.setBetSelection("02");
		accountBetTrx2.setBetType("01");
		accountBetTrx2.setCompType("EPL");
		accountBetTrx2.setEventDesc("Southampton vs Bournemouth");
		accountBetTrx2.setEventId(100001L);
		accountBetTrx2.setOdds(3.46);
		accountBetTrx2.setPotentialReturn(31.14);
		accountBetTrx2.setSettled(false);
		accountBetTrx2.setSettledDateTime(null);
		accountBetTrx2.setStartTime(startTime2);
		accountBetTrx2.setTrxDateTime(trxDateTime2);
		accountBetTrx2.setTrxId("B/100002/100038");

		String trxDateTimeStr3 = "2023-03-24 13:36:31";
		String startTimeStr3 = "2023-04-30 04:45:00";
		SimpleDateFormat formatter3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date trxDateTime3 = formatter3.parse(trxDateTimeStr3);
		Date startTime3 = formatter3.parse(startTimeStr3);

		AccountBetTrxView accountBetTrx3 = new AccountBetTrxView();
		accountBetTrx3.setAccId(100002L);
		accountBetTrx3.setBetAmount(20.00);
		accountBetTrx3.setBetSelection("02");
		accountBetTrx3.setBetType("01");
		accountBetTrx3.setCompType("EPL");
		accountBetTrx3.setEventDesc("Everton vs Newcastle United");
		accountBetTrx3.setEventId(100002L);
		accountBetTrx3.setOdds(5.17);
		accountBetTrx3.setPotentialReturn(103.4);
		accountBetTrx3.setSettled(false);
		accountBetTrx3.setSettledDateTime(null);
		accountBetTrx3.setStartTime(startTime3);
		accountBetTrx3.setTrxDateTime(trxDateTime3);
		accountBetTrx3.setTrxId("B/100002/100040");

		accountBetTrxList.add(accountBetTrx);
		accountBetTrxList.add(accountBetTrx2);
		accountBetTrxList.add(accountBetTrx3);

		return accountBetTrxList;
	}

	public static List<ResultEventMapping> createMockEplResultEventMapping() {
		List<ResultEventMapping> mockList = new ArrayList<>();
		ResultEventMapping resultEvent1 = new ResultEventMapping();
		resultEvent1.setEventId(BigInteger.valueOf(100000L));
		resultEvent1.setApiEventId("e306340bed661722ad957e5d8c15f798");
		resultEvent1.setCompType("EPL");
		resultEvent1.setOutcome("01");
		resultEvent1.setScore("4-1");
		resultEvent1.setCompleted(true);
		resultEvent1.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent2 = new ResultEventMapping();
		resultEvent2.setEventId(BigInteger.valueOf(100001L));
		resultEvent2.setApiEventId("2ad957e5d8661722ad957e5d8c15f798");
		resultEvent2.setCompType("EPL");
		resultEvent2.setOutcome("01");
		resultEvent2.setScore("4-0");
		resultEvent2.setCompleted(true);
		resultEvent2.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent3 = new ResultEventMapping();
		resultEvent3.setEventId(BigInteger.valueOf(100002L));
		resultEvent3.setApiEventId("1722ad957e661722ad957e5d8c15f798");
		resultEvent3.setCompType("EPL");
		resultEvent3.setOutcome("02");
		resultEvent3.setScore("1-1");
		resultEvent3.setCompleted(true);
		resultEvent3.setLastUpdatedDt(new Date());

		mockList.add(resultEvent1);
		mockList.add(resultEvent2);
		mockList.add(resultEvent3);
		return mockList;
	}

	public static Map<BigInteger, ResultEventMapping> createMockMapEplResultEventMapping() {
		Map<BigInteger, ResultEventMapping> resultEventMap = new HashMap<>();
		List<ResultEventMapping> mockList = AccountFixture.createMockEplResultEventMapping();
		resultEventMap.put(BigInteger.valueOf(100000L), mockList.get(0));
		resultEventMap.put(BigInteger.valueOf(100001L), mockList.get(1));
		resultEventMap.put(BigInteger.valueOf(100002L), mockList.get(2));
		return resultEventMap;
	}

	public static List<Object[]> createMockAllFundsTrxList() {
		List<Object[]> trxList = new ArrayList<>();
		Object[] trx1 = new Object[11];
		trx1[0] = new Date();
		trx1[1] = "Manchester United vs Chelsea";
		trx1[2] = "S";
		trx1[3] = 10.00;
		trx1[4] = new Date();
		trx1[5] = "EPL";
		trx1[6] = "01";
		trx1[7] = 1;
		trx1[8] = "B/100002/100051";
		trx1[9] = "02";
		trx1[10] = 3.25;
		Object[] trx2 = new Object[11];
		trx2[0] = new Date();
		trx2[1] = "Desposit $100";
		trx2[2] = "D";
		trx2[3] = 100.00;
		Object[] trx3 = new Object[11];
		trx3[0] = new Date();
		trx3[1] = "Withdrawal $40";
		trx3[2] = "W";
		trx3[3] = 40.00;
		trxList.add(trx1);
		trxList.add(trx2);
		trxList.add(trx3);
		return trxList;
	}

	public static List<AccountBetTrxView> createMockSportsBetTrxListWith3Wins(Long accId) {
		List<AccountBetTrxView> trxList = new ArrayList<>();
		AccountBetTrxView trx1 = new AccountBetTrxView();
		trx1.setAccId(100000L);
		trx1.setEventDesc("Chelsea vs Manchester United");
		trx1.setEventId(100008L);
		trx1.setTrxId("B/100000/100034");
		trx1.setTrxDateTime(new Date());
		trx1.setBetSelection("01");
		trx1.setOdds(3.05);
		trx1.setSettled(true);
		AccountBetTrxView trx2 = new AccountBetTrxView();
		trx2.setAccId(100000L);
		trx2.setEventDesc("Tottenham Hotspurs vs Arsenal");
		trx2.setEventId(100009L);
		trx2.setTrxId("B/100000/100035");
		trx2.setTrxDateTime(new Date());
		trx2.setBetSelection("02");
		trx2.setOdds(3.25);
		trx2.setSettled(true);
		AccountBetTrxView trx3 = new AccountBetTrxView();
		trx3.setAccId(100000L);
		trx3.setEventDesc("Burnley vs Manchester City");
		trx3.setEventId(100010L);
		trx3.setTrxId("B/100000/100036");
		trx3.setTrxDateTime(new Date());
		trx3.setBetSelection("03");
		trx3.setOdds(1.18);
		trx3.setSettled(true);

		AccountBetProcessTrxView betProcessTrx1 = new AccountBetProcessTrxView();
		betProcessTrx1.setAccId(accId);
		betProcessTrx1.setAmount(30.50);
		betProcessTrx1.setId(1L);
		betProcessTrx1.setTrxDt(new Date());
		betProcessTrx1.setTrxId("C/100000/100097");
		betProcessTrx1.setType("C");

		AccountBetProcessTrxView betProcessTrx2 = new AccountBetProcessTrxView();
		betProcessTrx2.setAccId(accId);
		betProcessTrx2.setAmount(32.5);
		betProcessTrx2.setId(2L);
		betProcessTrx2.setTrxDt(new Date());
		betProcessTrx2.setTrxId("C/100000/100098");
		betProcessTrx2.setType("C");

		AccountBetProcessTrxView betProcessTrx3 = new AccountBetProcessTrxView();
		betProcessTrx3.setAccId(accId);
		betProcessTrx3.setAmount(118.0);
		betProcessTrx3.setId(3L);
		betProcessTrx3.setTrxDt(new Date());
		betProcessTrx3.setTrxId("C/100000/100099");
		betProcessTrx3.setType("C");

		trx1.setAccountBetProcessTrxView(betProcessTrx1);
		trx2.setAccountBetProcessTrxView(betProcessTrx2);
		trx3.setAccountBetProcessTrxView(betProcessTrx3);

		trxList.add(trx1);
		trxList.add(trx2);
		trxList.add(trx3);
		return trxList;
	}

	public static List<AccountBetTrxView> createMockSportsBetTrxListWith1Win(Long accId) {
		List<AccountBetTrxView> trxList = new ArrayList<>();
		AccountBetTrxView trx1 = new AccountBetTrxView();
		trx1.setAccId(100000L);
		trx1.setEventDesc("Chelsea vs Manchester United");
		trx1.setEventId(100008L);
		trx1.setTrxId("B/100000/100034");
		trx1.setTrxDateTime(new Date());
		trx1.setBetSelection("02");
		trx1.setOdds(3.45);
		trx1.setSettled(true);
		AccountBetTrxView trx2 = new AccountBetTrxView();
		trx2.setAccId(100000L);
		trx2.setEventDesc("Tottenham Hotspurs vs Arsenal");
		trx2.setEventId(100009L);
		trx2.setTrxId("B/100000/100035");
		trx2.setTrxDateTime(new Date());
		trx2.setBetSelection("01");
		trx2.setOdds(2.25);
		trx2.setSettled(true);
		AccountBetTrxView trx3 = new AccountBetTrxView();
		trx3.setAccId(100000L);
		trx3.setEventDesc("Burnley vs Manchester City");
		trx3.setEventId(100010L);
		trx3.setTrxId("B/100000/100036");
		trx3.setTrxDateTime(new Date());
		trx3.setBetSelection("03");
		trx3.setOdds(1.18);
		trx3.setSettled(true);

		AccountBetProcessTrxView betProcessTrx3 = new AccountBetProcessTrxView();
		betProcessTrx3.setAccId(accId);
		betProcessTrx3.setAmount(118.0);
		betProcessTrx3.setId(3L);
		betProcessTrx3.setTrxDt(new Date());
		betProcessTrx3.setTrxId("C/100000/100099");
		betProcessTrx3.setType("C");

		trx3.setAccountBetProcessTrxView(betProcessTrx3);

		trxList.add(trx1);
		trxList.add(trx2);
		trxList.add(trx3);
		return trxList;
	}

	public static UpdateAccountInfoRest createMockUpdateAccountInfoData() {
		UpdateAccountInfoRest restInput = new UpdateAccountInfoRest();
		UpdateAccountInfoVO updateAccountInfoVO = new UpdateAccountInfoVO();
		updateAccountInfoVO.setContactNo("912345678");
		updateAccountInfoVO.setEmail("test@test.com");
		updateAccountInfoVO.setUsername("DUMMYUSER");
		restInput.setAccountDetails(updateAccountInfoVO);
		return restInput;
	}

	public static UpdateAccountInfoRest createMockUpdateAccountPasswordData() {
		UpdateAccountInfoRest restInput = new UpdateAccountInfoRest();
		UpdateAccountInfoVO updateAccountInfoVO = new UpdateAccountInfoVO();
		updateAccountInfoVO.setNewPassword("NEWdummypassword");
		updateAccountInfoVO.setOldPassword("OLDdummypassword");
		updateAccountInfoVO.setUsername("DUMMYUSER");
		restInput.setAccountDetails(updateAccountInfoVO);
		return restInput;
	}

	public static UserView mockCreateUserViewData() {
		UserView userView = new UserView();
		userView.setContactNo("91234567");
		userView.setCreatedDt(new Date());
		userView.setDelInd("N");
		userView.setEmail("test@test.com");
		userView.setId(3L);
		userView.setPassword("dummyPassword");
		userView.setUsername("CHOONANN");
		return userView;
	}
}
