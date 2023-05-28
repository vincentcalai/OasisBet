package com.oasisbet.account.view;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_other_trx")
public class AccountOtherTrxView {
	@Id
	@Column(name = "trx_id", nullable = false, precision = 15, scale = 0)
	private String trxId;

	@Column(name = "acc_id", nullable = false, precision = 6, scale = 0)
	private Long accId;

	@Column(name = "type", nullable = false, length = 1)
	private String type;

	@Column(name = "amount", nullable = false, precision = 6, scale = 2)
	private Double amount;

	@Column(name = "trx_dt")
	private Date trxDt;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Date getTrxDt() {
		return trxDt;
	}

	public void setTrxDt(Date trxDt) {
		this.trxDt = trxDt;
	}

}
