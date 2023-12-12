package com.oasisbet.account.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrxBetDetailsVO {
	private Date startTime;
	private String compType;
	private String betDetails;
	private String betType;
	private Boolean status;
	private String trxId;
}
