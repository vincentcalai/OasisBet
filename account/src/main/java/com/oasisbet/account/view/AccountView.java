package com.oasisbet.account.view;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_acc")
public class AccountView {
	private Long accId;
	private Long usrId;
	private Double balance;
	private Double depositLimit;
	private Double betLimit;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "acc_id", unique = true, nullable = false, precision = 22, scale = 0)
	public Long getAccId() {
		return accId;
	}

	public void setAccId(Long accId) {
		this.accId = accId;
	}

	@Column(name = "usr_id", nullable = false, precision = 22, scale = 0)
	public Long getUsrId() {
		return usrId;
	}

	public void setUsrId(Long usrId) {
		this.usrId = usrId;
	}

	@Column(name = "balance", nullable = false, precision = 10, scale = 2)
	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	@Column(name = "deposit_limit", nullable = false, precision = 10, scale = 2)
	public Double getDepositLimit() {
		return depositLimit;
	}

	public void setDepositLimit(Double depositLimit) {
		this.depositLimit = depositLimit;
	}

	@Column(name = "bet_limit", nullable = false, precision = 10, scale = 2)
	public Double getBetLimit() {
		return betLimit;
	}

	public void setBetLimit(Double betLimit) {
		this.betLimit = betLimit;
	}

}
