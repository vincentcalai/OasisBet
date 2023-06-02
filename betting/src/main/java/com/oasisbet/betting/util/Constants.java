package com.oasisbet.betting.util;

public class Constants {
	public static final String YES = "Y";
	public static final String NO = "N";
	public static final String AMPERSAND = "&";

	public static final String API_SOURCE_API_KEY = "4cb61e84b1c798ec69e03a836c068cea";
	public static final String API_SOURCE_URI_EU_REGION = "eu";
	public static final String API_SOURCE_URI_MARKET_H2H = "h2h";
	public static final String API_SOURCE_URI_DATE_FORMAT_ISO = "iso";
	public static final String API_SOURCE_URI_ODDS_FORMAT_DEC = "decimal";
	public static final String API_SOURCE_URI_BOOKMKR_PINNACLE = "pinnacle";

	public static final String API_SOURCE_BASE_URI = "https://api.the-odds-api.com/v4/sports/";
	public static final String API_SOURCE_URI_ODDS = "/odds?";
	public static final String API_SOURCE_URI_API_KEY_PARAM = "apiKey=";
	public static final String API_SOURCE_URI_REGION_PARAM = "regions=";
	public static final String API_SOURCE_URI_MARKET_PARAM = "markets=";
	public static final String API_SOURCE_URI_DATE_FORMAT_PARAM = "dateFormat=";
	public static final String API_SOURCE_URI_ODDS_FORMAT_PARAM = "oddsFormat=";
	public static final String API_SOURCE_URI_BOOKMKR_PARAM = "bookmakers=";

	public static final String API_SOURCE_COMP_TYPE_EPL = "soccer_epl";
	public static final String API_SOURCE_COMP_TYPE_LALIGA = "soccer_spain_la_liga";
	public static final String API_SOURCE_COMP_TYPE_BUNDESLIGA = "soccer_germany_bundesliga";
	public static final String API_SOURCE_COMP_TYPE_SERIE_A = "soccer_italy_serie_a";
	public static final String API_SOURCE_COMP_TYPE_LIGUE_ONE = "soccer_france_ligue_one";

	public static final String EVENT_ID = "event_id";
	public static final String COMP_TYPE = "comp_type";
	public static final String API_EVENT_ID = "api_event_id";

	// Success Messages
	public static final String BET_SUCCESS_MSG = "Bet successfully placed!";

	// Error Messages
	public static final String RETRIEVE_ODDS_API_EXCEPTION = "Error Retrieving Odds from source API";
	public static final String DATE_PARSING_EXCEPTION = "Error Parsing Date";

}
