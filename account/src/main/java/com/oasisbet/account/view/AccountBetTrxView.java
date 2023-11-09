package com.oasisbet.account.view;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_bet_trx")
public class AccountBetTrxView {
	@Id
	@Column(name = "trx_id")
	private String trxId;

	@Column(name = "acc_id", nullable = false, precision = 15, scale = 0)
	private Long accId;

	@Column(name = "event_id", nullable = false)
	private Long eventId;

	@Column(name = "event_desc", nullable = false, length = 100)
	private String eventDesc;

	@Column(name = "comp_type", nullable = false, length = 30)
	private String compType;

	@Column(name = "start_time", nullable = false)
	private Date startTime;

	@Column(name = "bet_type", nullable = false, length = 30)
	private String betType;

	@Column(name = "bet_selection", nullable = false, length = 30)
	private String betSelection;

	@Column(name = "bet_amt", nullable = false, precision = 4, scale = 2)
	private Double betAmount;

	@Column(name = "odds", nullable = false)
	private Double odds;

	@Column(name = "potential_return", nullable = false)
	private Double potentialReturn;

	@Column(name = "is_settled")
	private Boolean settled;

	@Column(name = "trx_dt")
	private Date trxDateTime;

	@Column(name = "settled_dt")
	private Date settledDateTime;

	@OneToOne(mappedBy = "accountBetTrxView")
	private AccountBetProcessTrxView accountBetProcessTrxView;

	public String getTrxId() {
		return trxId;
	}

	public void setTrxId(String trxId) {
		this.trxId = trxId;
	}

	public Long getAccId() {
		return accId;
	}

	public void setAccId(Long accId) {
		this.accId = accId;
	}

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public String getEventDesc() {
		return eventDesc;
	}

	public void setEventDesc(String eventDesc) {
		this.eventDesc = eventDesc;
	}

	public String getCompType() {
		return compType;
	}

	public void setCompType(String compType) {
		this.compType = compType;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public String getBetType() {
		return betType;
	}

	public void setBetType(String betType) {
		this.betType = betType;
	}

	public String getBetSelection() {
		return betSelection;
	}

	public void setBetSelection(String betSelection) {
		this.betSelection = betSelection;
	}

	public Double getBetAmount() {
		return betAmount;
	}

	public void setBetAmount(Double betAmount) {
		this.betAmount = betAmount;
	}

	public Double getOdds() {
		return odds;
	}

	public void setOdds(Double odds) {
		this.odds = odds;
	}

	public Double getPotentialReturn() {
		return potentialReturn;
	}

	public void setPotentialReturn(Double potentialReturn) {
		this.potentialReturn = potentialReturn;
	}

	public Boolean getSettled() {
		return settled;
	}

	public void setSettled(Boolean settled) {
		this.settled = settled;
	}

	public Date getTrxDateTime() {
		return trxDateTime;
	}

	public void setTrxDateTime(Date trxDateTime) {
		this.trxDateTime = trxDateTime;
	}

	public Date getSettledDateTime() {
		return settledDateTime;
	}

	public void setSettledDateTime(Date settledDateTime) {
		this.settledDateTime = settledDateTime;
	}

	public AccountBetProcessTrxView getAccountBetProcessTrxView() {
		return accountBetProcessTrxView;
	}

	public void setAccountBetProcessTrxView(AccountBetProcessTrxView accountBetProcessTrxView) {
		this.accountBetProcessTrxView = accountBetProcessTrxView;
	}

}