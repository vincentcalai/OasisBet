package com.oasisbet.account.util;

public class Constants {

	public static final String NO = "N";
	public static final String SLASH = "/";

	public static final Double INIT_BAL_AMT = 0.00;
	public static final Double INIT_DEPOSIT_LIMIT = 1000.00;
	public static final double MAX_BAL_AMT = 199999.99;

	public static final String TRX_TYPE_BET = "B";
	public static final String TRX_TYPE_DEPOSIT = "D";
	public static final String TRX_TYPE_WITHDRAWAL = "W";
	public static final String TRX_TYPE_ALL_FUNDS = "F";

	public static final String DEPOSIT_CD = "deposit";
	public static final String WITHDRAWAL_CD = "withdrawal";
	public static final String FUNDS_CD = "funds";

	public static final String DEPOSIT_DESC = "Deposit";
	public static final String WITHDRAWAL_DESC = "Withdrawal";

	public static final String TODAY = "today";
	public static final String LAST_7_DAY = "last7day";
	public static final String LAST_1_MTH = "last1mth";
	public static final String LAST_3_MTH = "last3mth";
	public static final String LAST_6_MTH = "last6mth";

	// User Response Message
	public static final String USER_CREATE_SUCCESS = "User was created successfully.";

	// Bet Response Message
	public static final String BET_PLACED_SUCCESS = "Bet placed successfully at ";

	// Deposit/Withdraw Account Response Message
	public static final String DEPOSIT_ACC_SUCCESS = "Deposit was successful.";
	public static final String WITHDRAW_ACC_SUCCESS = "Withdrawal was successful.";

	// Exceptions
	public static final String ERR_USER_EXIST = "Username already existed. Please use another username";
	public static final String ERR_USER_ACC_NOT_FOUND = "User Betting Account not found. Please contact the administrator.";
	public static final String ERR_MAX_BAL_AMT = "The maximum balance in an account is $199999.99";
	public static final String ERR_OVER_DEPOSIT_LIMIT = "You have reached deposit limit for this month. Please make your deposit from next month onwards";
	public static final String ERR_OVERDRAFT_BAL = "The withdrawal amount is more than the current account balance";

	// Exception - Betting
	public static final String ERR_INSUFFICIENT_BAL = "You have insufficient balance in your account. Please top up your account.";
}
