package com.oasisbet.betting.odds.model.request;

import java.util.List;

import com.oasisbet.betting.odds.model.BetSubmissionVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BetSlipRest {
	private Long userId;
	private List<BetSubmissionVO> betSlip;
}
