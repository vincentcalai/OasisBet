package com.oasisbet.account.model;

public class AccountVO {
	private Long accId;
	private Long usrId;
	private Double balance;
	private Double depositLimit;
	private Double depositAmt;
	private Double withdrawalAmt;
	private String actionType;
	private Double ytdDepositAmt;
	private Double ytdWithdrawalAmt;
	private Double betLimit;
	private Double mtdDepositAmt;
	private Double mtdBetAmount;
	private Double mthPayout;

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

	public Double getYtdDepositAmt() {
		return ytdDepositAmt;
	}

	public void setYtdDepositAmt(Double ytdDepositAmt) {
		this.ytdDepositAmt = ytdDepositAmt;
	}

	public Double getYtdWithdrawalAmt() {
		return ytdWithdrawalAmt;
	}

	public void setYtdWithdrawalAmt(Double ytdWithdrawalAmt) {
		this.ytdWithdrawalAmt = ytdWithdrawalAmt;
	}

	public Double getBetLimit() {
		return betLimit;
	}

	public void setBetLimit(Double betLimit) {
		this.betLimit = betLimit;
	}

	public Double getMtdDepositAmt() {
		return mtdDepositAmt;
	}

	public void setMtdDepositAmt(Double mtdDepositAmt) {
		this.mtdDepositAmt = mtdDepositAmt;
	}

	public Double getMtdBetAmount() {
		return mtdBetAmount;
	}

	public void setMtdBetAmount(Double mtdBetAmount) {
		this.mtdBetAmount = mtdBetAmount;
	}

	public Double getMthPayout() {
		return mthPayout;
	}

	public void setMthPayout(Double mthPayout) {
		this.mthPayout = mthPayout;
	}
}
