package com.oasisbet.account.util;

public class Constants {

	public static final String NO = "N";

	public static final Double INIT_BAL_AMT = 0.00;
	public static final Double INIT_DEPOSIT_LIMIT = 1000.00;
	public static final double MAX_BAL_AMT = 199999.99;

	// User Response Message
	public static final String USER_CREATE_SUCCESS = "User was created successfully.";

	// Trip Response Message
	public static final String TRIP_CREATE_SUCCESS = "Trip was created successfully.";

	// Exceptions
	public static final String ERR_USER_EXIST = "Username already existed. Please use another username";
	public static final String ERR_USER_ACC_NOT_FOUND = "User Betting Account not found. Please contact the administrator.";
	public static final String ERR_MAX_BAL_AMT = "The maximum balance in an account is $199999.99";
	public static final String ERR_OVER_DEPOSIT_LIMIT = "you have reached deposit limit for this month, please make your deposit from next month onwards";

}
