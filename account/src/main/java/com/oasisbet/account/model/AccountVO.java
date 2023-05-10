package com.oasisbet.account.model;

public class AccountVO {
	private Long accId;
	private Long usrId;
	private Double balance;
	private Double depositLimit;

	public Long getAccId() {
		return accId;
	}

	public void setAccId(Long accId) {
		this.accId = accId;
	}

	public Long getUsrId() {
		return usrId;
	}

	public void setUsrId(Long usrId) {
		this.usrId = usrId;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Double getDepositLimit() {
		return depositLimit;
	}

	public void setDepositLimit(Double depositLimit) {
		this.depositLimit = depositLimit;
	}
}
