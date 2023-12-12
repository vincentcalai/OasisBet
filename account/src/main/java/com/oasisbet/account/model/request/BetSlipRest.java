package com.oasisbet.account.model.request;

import java.util.List;

import com.oasisbet.account.model.BetSubmissionVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BetSlipRest {
	private Long userId;
	private List<BetSubmissionVO> betSlip;
}
