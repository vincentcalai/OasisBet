package com.oasisbet.account.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrxHistVO {
	private Date dateTime;
	private String desc;
	private String type;
	private Double amount;
	private TrxBetDetailsVO trxBetDetails;
}
