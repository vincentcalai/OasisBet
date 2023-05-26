package com.oasisbet.account.view;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_other_trx")
public class AccountOtherTrx {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trx_id", unique = true, nullable = false, precision = 22, scale = 0)
	private Long trxId;

	@Id
	@Column(name = "acc_id", nullable = false, precision = 22, scale = 0)
	private Long accId;

	@Column(name = "type", nullable = false, length = 1)
	private String type;

	@Column(name = "amount", nullable = false, precision = 6, scale = 2)
	private Long amount;

	@Column(name = "trx_dt")
	private LocalDateTime trxDt;

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

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public LocalDateTime getTrxDt() {
		return trxDt;
	}

	public void setTrxDt(LocalDateTime trxDt) {
		this.trxDt = trxDt;
	}

}
