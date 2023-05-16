package com.oasisbet.account.model;

public class AccountVO {
	private Long accId;
	private Long usrId;
	private Double balance;
	private Double depositLimit;
	private Double depositAmt;
	private Double withdrawalAmt;
	private String actionType;

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

	public Double getDepositAmt() {
		return depositAmt;
	}

	public void setDepositAmt(Double depositAmt) {
		this.depositAmt = depositAmt;
	}

	public Double getWithdrawalAmt() {
		return withdrawalAmt;
	}

	public void setWithdrawalAmt(Double withdrawalAmt) {
		this.withdrawalAmt = withdrawalAmt;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
}
