package com.oasisbet.betting.odds.util;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Constants {
	public static final boolean TRUE = true;
	public static final boolean FALSE = false;

	public static final String EMPTY_STRING = "";
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

	public static final String COMP_TYPE_EPL = "EPL";
	public static final String COMP_TYPE_LA_LIGA = "LALIGA";
	public static final String COMP_TYPE_BUNDESLIGA = "BUNDESLIGA";
	public static final String COMP_TYPE_SERIE_A = "SERIEA";
	public static final String COMP_TYPE_LIGUE_ONE = "LIGUEONE";

	public static final List<String> API_SOURCE_COMP_TYPE_LIST = Arrays.asList(API_SOURCE_COMP_TYPE_EPL,
			API_SOURCE_COMP_TYPE_LALIGA, API_SOURCE_COMP_TYPE_BUNDESLIGA, API_SOURCE_COMP_TYPE_SERIE_A,
			API_SOURCE_COMP_TYPE_LIGUE_ONE);
	public static final Map<String, String> API_SOURCE_COMP_TYPE_MAP = new HashMap<>();

	public static final String EVENT_TYPE_1X2 = "01";

	public static final String EVENT_ID = "event_id";
	public static final String COMP_TYPE = "comp_type";
	public static final String API_EVENT_ID = "api_event_id";
	public static final String EVENT_TYPE = "event_type";
	public static final String COMMENCE_TIME = "commence_time";
	public static final String HOME_TEAM = "home_team";
	public static final String AWAY_TEAM = "away_team";
	public static final String HOME_ODDS = "home_odds";
	public static final String AWAY_ODDS = "away_odds";
	public static final String DRAW_ODDS = "draw_odds";
	public static final String COMPLETED = "completed";
	public static final String CREATED_DT = "create_dt";

	// Success Messages
	public static final String BET_SUCCESS_MSG = "Bet successfully placed!";

	// Error Messages
	public static final String BET_PROCESS_ERROR = "There is an error while processing your bet. Please contact the administrator.";
	public static final String RETRIEVE_ODDS_API_EXCEPTION = "Error Retrieving Odds from source API";
	public static final String DATE_PARSING_EXCEPTION = "Error Parsing Date";

	static {
		API_SOURCE_COMP_TYPE_MAP.put(API_SOURCE_COMP_TYPE_EPL, COMP_TYPE_EPL);
		API_SOURCE_COMP_TYPE_MAP.put(API_SOURCE_COMP_TYPE_LALIGA, COMP_TYPE_LA_LIGA);
		API_SOURCE_COMP_TYPE_MAP.put(API_SOURCE_COMP_TYPE_BUNDESLIGA, COMP_TYPE_BUNDESLIGA);
		API_SOURCE_COMP_TYPE_MAP.put(API_SOURCE_COMP_TYPE_SERIE_A, COMP_TYPE_SERIE_A);
		API_SOURCE_COMP_TYPE_MAP.put(API_SOURCE_COMP_TYPE_LIGUE_ONE, COMP_TYPE_LIGUE_ONE);
	}

}
