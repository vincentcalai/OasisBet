package com.oasisbet.account.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountVO {
	private Long accId;
	private Long usrId;
	private Double balance;
	private Double depositLimit;
	private Double depositAmt;
	private Double withdrawalAmt;
	private String actionType;
	private Double ytdDepositAmt;
	private Double ytdWithdrawalAmt;
	private Double betLimit;
	private Double mtdDepositAmt;
	private Double mtdBetAmount;
	private Double mthPayout;
}
