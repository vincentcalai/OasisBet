package com.oasisbet.account.fixture;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.request.BetSlipRest;

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
}
