package com.oasisbet.account.view;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_bet_process_trx")
public class AccountBetProcessTrxView {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "trx_id", length = 15, nullable = false)
	private String trxId;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ref_trx_id", referencedColumnName = "trx_id")
	private AccountBetTrxView accountBetTrxView;

	@Column(name = "acc_id", nullable = false)
	private Long accId;

	@Column(nullable = false)
	private Double amount;

	@Column(length = 1, nullable = false)
	private String type;

	@Column(name = "trx_dt", nullable = false)
	private Date trxDt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTrxId() {
		return trxId;
	}

	public void setTrxId(String trxId) {
		this.trxId = trxId;
	}

	public AccountBetTrxView getAccountBetTrxView() {
		return accountBetTrxView;
	}

	public void setAccountBetTrxView(AccountBetTrxView accountBetTrxView) {
		this.accountBetTrxView = accountBetTrxView;
	}

	public Long getAccId() {
		return accId;
	}

	public void setAccId(Long accId) {
		this.accId = accId;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getTrxDt() {
		return trxDt;
	}

	public void setTrxDt(Date trxDt) {
		this.trxDt = trxDt;
	}

}
