package com.oasisbet.betting.fixture;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.BetSubmissionVO;
import com.oasisbet.betting.odds.model.H2HEventOdds;
import com.oasisbet.betting.odds.model.TeamsDetails;
import com.oasisbet.betting.odds.model.request.BetSlipRest;

public class BettingFixture {
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

	public static List<BetEvent> createMockOddsData() {
		TeamsDetails teamDetails1 = new TeamsDetails("Manchester City", "Manchester United");
		H2HEventOdds eventOdds1 = new H2HEventOdds(1.65, 3.80, 6.55);
		eventOdds1.setEventId(BigInteger.valueOf(1000000L));
		BetEvent betEvent1 = new BetEvent("English Premier League", "Manchester City vs Manchester United", new Date(),
				teamDetails1, eventOdds1);
		betEvent1.setEventId(BigInteger.valueOf(1000000L));

		TeamsDetails teamDetails2 = new TeamsDetails("Chelsea", "Liverpool");
		H2HEventOdds eventOdds2 = new H2HEventOdds(2.65, 3.20, 2.52);
		eventOdds2.setEventId(BigInteger.valueOf(1000001L));
		BetEvent betEvent2 = new BetEvent("English Premier League", "Chelsea vs Liverpool", new Date(), teamDetails2,
				eventOdds2);
		betEvent1.setEventId(BigInteger.valueOf(1000001L));

		TeamsDetails teamDetails3 = new TeamsDetails("Arsenal", "Luton Town");
		H2HEventOdds eventOdds3 = new H2HEventOdds(1.15, 6.5, 15.00);
		eventOdds3.setEventId(BigInteger.valueOf(1000002L));
		BetEvent betEvent3 = new BetEvent("English Premier League", "Arsenal vs Luton Town", new Date(), teamDetails3,
				eventOdds3);
		betEvent1.setEventId(BigInteger.valueOf(1000002L));

		return Arrays.asList(betEvent1, betEvent2, betEvent3);
	}
}
