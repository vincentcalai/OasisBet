package com.oasisbet.betting.odds.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BetSubmissionVO {
	public Long eventId;
	public String eventDesc;
	public String compType;
	public Date startTime;
	public String betSelection;
	public String betSelectionName;
	public String betTypeCd;
	public Double odds;
	public Double betAmount;
	public Double potentialPayout;
}