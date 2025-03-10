package com.oasisbet.account.util;

public class Constants {

	public static final boolean TRUE = true;
	public static final boolean FALSE = false;
	public static final String EMPTY_STRING = "";
	public static final String NO = "N";
	public static final String YES = "Y";
	public static final String SLASH = "/";
	public static final String SPACE = " ";
	public static final String DOLLAR_SIGN = "$";
	public static final String AT_SIGN = "@";

	public static final Double INIT_BAL_AMT = 0.00;
	public static final Double INIT_DEPOSIT_LIMIT = 1000.00;
	public static final Double INIT_BET_LIMIT = 200.00;
	public static final double MAX_BAL_AMT = 199999.99;

	public static final String TRX_TYPE_BET = "B";
	public static final String TRX_TYPE_WINNING_CREDIT = "C";
	public static final String TRX_TYPE_DEPOSIT = "D";
	public static final String TRX_TYPE_WITHDRAWAL = "W";
	public static final String TRX_TYPE_ALL_FUNDS = "F";
	public static final String TRX_TYPE_SPORTS_BET = "S";

	public static final String DEPOSIT_CD = "deposit";
	public static final String WITHDRAWAL_CD = "withdrawal";
	public static final String FUNDS_CD = "funds";
	public static final String SPORTS_BET_CD = "sportsbet";

	public static final String DEPOSIT_DESC = "Deposit";
	public static final String WITHDRAWAL_DESC = "Withdrawal";

	public static final String TODAY = "today";
	public static final String LAST_7_DAY = "last7day";
	public static final String LAST_1_MTH = "last1mth";
	public static final String LAST_3_MTH = "last3mth";
	public static final String LAST_6_MTH = "last6mth";

	public static final String BET_TYPE_1X2 = "01";

	public static final String BET_SELECT_HOME = "01";
	public static final String BET_SELECT_DRAW = "02";
	public static final String BET_SELECT_AWAY = "03";

	public static final String DRAW = "DRAW";

	// User Response Message
	public static final String USER_CREATE_SUCCESS = "User was created successfully.";

	// Bet Response Message
	public static final String BET_PLACED_SUCCESS = "Bet placed successfully at ";

	// Deposit/Withdraw/Change Limit Account Response Message
	public static final String DEPOSIT_ACC_SUCCESS = "Deposit was successful.";
	public static final String WITHDRAW_ACC_SUCCESS = "Withdrawal was successful.";
	public static final String CHANGE_LIMIT_ACC_SUCCESS = "Deposit/Bet Limit Change was successful.";
	public static final String ACC_PW_UPDATE_SUCESSS = "Password has been updated successfully.";
	public static final String ACC_INFO_UPDATE_SUCESSS = "Contact Info has been updated successfully.";
	public static final String TERMINATE_ACC_SUCCESS = "Account has been terminated successfully.";
	// General Exceptions
	public static final String ERR_USER_EXIST = "Username already existed. Please use another username";
	public static final String ERR_USER_NOT_FOUND = "User not found. Please contact the administrator.";
	public static final String ERR_USER_ACC_NOT_FOUND = "User Account/Betting Account not found. Please contact the administrator.";
	public static final String ERR_MAX_BAL_AMT = "The maximum balance in an account is $199999.99";
	public static final String ERR_OVER_DEPOSIT_LIMIT = "You have reached deposit limit for this month. Please make your deposit from next month onwards";
	public static final String ERR_OVERDRAFT_BAL = "The withdrawal amount is more than the current account balance";
	public static final String ERR_RETRIEVE_TRX = "There is something wrong while retrieving the transaction history data. Please contact the administrator.";
	public static final String ERR_USER_DISABLED = "Username is disabled. Please contact the administrator.";
	public static final String ERR_USER_INVALID_CREDENTIAL = "Old credential is incorrect. Please enter the correct old password";
	public static final String ERR_BALANCE_NOT_ZERO = "There are still funds in your account. Please make sure that you have withdrawn all funds from your Account";
	// Exception - Betting
	public static final String ERR_INSUFFICIENT_BAL = "You have insufficient balance in your account. Please top up your account.";
	public static final String ERR_BET_LIMIT_EXCEEDED = "Your total betting amount has exceeded the bet limit for this month. Your bet will not be processed.";

}
