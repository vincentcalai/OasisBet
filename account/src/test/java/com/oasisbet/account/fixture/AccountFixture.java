package com.oasisbet.account.fixture;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.ResultEventMapping;
import com.oasisbet.account.model.request.BetSlipRest;
import com.oasisbet.account.view.AccountBetTrxView;

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

	public static List<ResultEventMapping> createMockEplResultEventMapping() {
		List<ResultEventMapping> mockList = new ArrayList<>();
		ResultEventMapping resultEvent1 = new ResultEventMapping();
		resultEvent1.setEventId(BigInteger.valueOf(1000003L));
		resultEvent1.setApiEventId("e306340bed661722ad957e5d8c15f798");
		resultEvent1.setCompType("EPL");
		resultEvent1.setOutcome("01");
		resultEvent1.setScore("4-1");
		resultEvent1.setCompleted(true);
		resultEvent1.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent2 = new ResultEventMapping();
		resultEvent2.setEventId(BigInteger.valueOf(1000004L));
		resultEvent2.setApiEventId("2ad957e5d8661722ad957e5d8c15f798");
		resultEvent2.setCompType("EPL");
		resultEvent2.setOutcome("01");
		resultEvent2.setScore("4-0");
		resultEvent2.setCompleted(true);
		resultEvent2.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent3 = new ResultEventMapping();
		resultEvent3.setEventId(BigInteger.valueOf(1000005L));
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
}
