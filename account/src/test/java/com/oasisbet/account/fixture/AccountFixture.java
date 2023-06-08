package com.oasisbet.account.fixture;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.request.BetSlipRest;

public class AccountFixture {
	public static BetSlipRest createMockBetSubmissionData() {
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

	public static AccountVO createMockAccountVO() {
		AccountVO accountVo = new AccountVO();
		accountVo.setAccId(100002L);
		accountVo.setActionType("D");
		accountVo.setBalance(2000.00);
		accountVo.setDepositAmt(100.00);
		accountVo.setDepositLimit(500.00);
		accountVo.setMtdBetAmount(58.88);
		accountVo.setMthPayout(62.99);
		accountVo.setUsrId(1L);
		accountVo.setWithdrawalAmt(560.00);
		accountVo.setYtdDepositAmt(399.10);
		accountVo.setYtdWithdrawalAmt(672.50);
		return accountVo;
	}
}
