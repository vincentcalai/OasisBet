package com.oasisbet.result.util;

import java.util.Arrays;
import java.util.List;

public class Constants {

	public static final boolean TRUE = true;
	public static final boolean FALSE = false;

	public static final String EMPTY_STRING = "";
	public static final String DASH = "-";
	public static final String AMPERSAND = "&";

	public static final String API_SOURCE_API_KEY = "4cb61e84b1c798ec69e03a836c068cea";
	public static final String API_SOURCE_URI_DEFAULT_DAY = "3";

	public static final String API_SOURCE_BASE_URI = "https://api.the-odds-api.com/v4/sports/";
	public static final String API_SOURCE_URI_SCORES = "/scores?";
	public static final String API_SOURCE_URI_API_KEY_PARAM = "apiKey=";
	public static final String API_SOURCE_URI_DAYS_FROM_PARAM = "daysFrom=";

	public static final String API_SOURCE_COMP_TYPE_EPL = "soccer_epl";
	public static final String API_SOURCE_COMP_TYPE_LALIGA = "soccer_spain_la_liga";
	public static final String API_SOURCE_COMP_TYPE_BUNDESLIGA = "soccer_germany_bundesliga";
	public static final String API_SOURCE_COMP_TYPE_SERIE_A = "soccer_italy_serie_a";
	public static final String API_SOURCE_COMP_TYPE_LIGUE_ONE = "soccer_france_ligue_one";

	public static final String RETRIEVE_RESULT_API_EXCEPTION = "Error Retrieving Results from source API";
	public static final String DATE_PARSING_EXCEPTION = "Error Parsing Date";

	public static final String EVENT_ID = "event_id";
	public static final String COMP_TYPE = "comp_type";
	public static final String API_EVENT_ID = "api_event_id";

	public static final String RESULT_RETRIEVE_LAST_24_HRS = "last24Hrs";
	public static final String RESULT_RETRIEVE_CUSTOM = "custom";

	public static final List<String> COMP_TYPE_LIST = Arrays.asList(Constants.API_SOURCE_COMP_TYPE_EPL,
			Constants.API_SOURCE_COMP_TYPE_LALIGA, Constants.API_SOURCE_COMP_TYPE_BUNDESLIGA,
			Constants.API_SOURCE_COMP_TYPE_SERIE_A, Constants.API_SOURCE_COMP_TYPE_LIGUE_ONE);
}
