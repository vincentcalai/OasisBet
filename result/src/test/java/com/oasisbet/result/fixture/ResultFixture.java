package com.oasisbet.result.fixture;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.Score;

public class ResultFixture {

	public static ResultApiResponse[] mockEplInsert3NewResultEvents() {

		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		mockResponse1.setId("66ca5a121b5ddc4763cf1708222be377");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("English Premier League");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Mock Team 1");
		mockResponse1.setAway_team("Mock Team 2");
		mockResponse1.setCompleted(false);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");

		mockResponse2.setId("a085aa8beb661722ad957e5d8c15f798");
		mockResponse2.setSport_key("soccer_epl");
		mockResponse2.setSport_title("English Premier League");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Mock Team 1");
		mockResponse2.setAway_team("Mock Team 2");
		mockResponse2.setCompleted(false);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");

		mockResponse3.setId("f7d5d5a141e21df15f23b5e306340bed");
		mockResponse3.setSport_key("soccer_epl");
		mockResponse3.setSport_title("English Premier League");
		mockResponse3.setCommence_time("2023-04-30T19:45:00Z");
		mockResponse3.setHome_team("Mock Team 1");
		mockResponse3.setAway_team("Mock Team 2");
		mockResponse3.setCompleted(false);
		mockResponse3.setLast_update("2023-04-30T22:45:00Z");

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static ResultApiResponse[] mockEplResultApiResponseArray() {

		ResultApiResponse[] array = new ResultApiResponse[4];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();
		ResultApiResponse mockResponse4 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Tottenham Hotspur");
		mockHomeScore1.setScore("4");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("Leicester City");
		mockAwayScore1.setScore("1");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("e306340bed661722ad957e5d8c15f798");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("English Premier League");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Tottenham Hotspur");
		mockResponse1.setAway_team("Leicester City");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		List<Score> scoreList2 = new ArrayList<>();
		Score mockHomeScore2 = new Score();
		mockHomeScore2.setName("Arsenal");
		mockHomeScore2.setScore("4");
		scoreList2.add(mockHomeScore2);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Sheffield United");
		mockAwayScore2.setScore("0");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("2ad957e5d8661722ad957e5d8c15f798");
		mockResponse2.setSport_key("soccer_epl");
		mockResponse2.setSport_title("English Premier League");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Arsenal");
		mockResponse2.setAway_team("Sheffield United");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		List<Score> scoreList3 = new ArrayList<>();
		Score mockHomeScore3 = new Score();
		mockHomeScore3.setName("Newcastle United");
		mockHomeScore3.setScore("1");
		scoreList3.add(mockHomeScore3);
		Score mockAwayScore3 = new Score();
		mockAwayScore3.setName("Manchester United");
		mockAwayScore3.setScore("1");
		scoreList3.add(mockAwayScore3);

		mockResponse3.setId("1722ad957e661722ad957e5d8c15f798");
		mockResponse3.setSport_key("soccer_epl");
		mockResponse3.setSport_title("English Premier League");
		mockResponse3.setCommence_time("2023-04-30T19:45:00Z");
		mockResponse3.setHome_team("Newcastle United");
		mockResponse3.setAway_team("Manchester United");
		mockResponse3.setCompleted(true);
		mockResponse3.setLast_update("2023-04-30T22:45:00Z");
		mockResponse3.setScores(scoreList3);

		mockResponse4.setId("66ca5a121b5ddc4763cf1708222be377");
		mockResponse4.setSport_key("soccer_epl");
		mockResponse4.setSport_title("English Premier League");
		mockResponse4.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse4.setHome_team("Southampton");
		mockResponse4.setAway_team("Borunemouth");
		mockResponse4.setCompleted(false);
		mockResponse4.setLast_update("2023-04-29T18:45:00Z");

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;
		array[3] = mockResponse4;

		return array;
	}

	public static ResultApiResponse[] mockLaLigaResultApiResponseArray() {
		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Real Madrid");
		mockHomeScore1.setScore("1");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("Barcelona");
		mockAwayScore1.setScore("1");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("cd9b93ed73f1f71a3127dba6d58c6867");
		mockResponse1.setSport_key("soccer_laliga");
		mockResponse1.setSport_title("La Liga");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Real Madrid");
		mockResponse1.setAway_team("Barcelona");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		List<Score> scoreList2 = new ArrayList<>();
		Score mockHomeScore2 = new Score();
		mockHomeScore2.setName("Valencia");
		mockHomeScore2.setScore("2");
		scoreList2.add(mockHomeScore2);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Sevilla");
		mockAwayScore2.setScore("3");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("b15f43f6377bb61f479242013931f2f3");
		mockResponse2.setSport_key("soccer_laliga");
		mockResponse2.setSport_title("La Liga");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Valencia");
		mockResponse2.setAway_team("Sevilla");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		mockResponse3.setId("9cb6d859a9d89f07dd4c5bae37fb1224");
		mockResponse3.setSport_key("soccer_laliga");
		mockResponse3.setSport_title("La Liga");
		mockResponse3.setCommence_time("2023-04-27T18:45:00Z");
		mockResponse3.setHome_team("Villarreal CF");
		mockResponse3.setAway_team("Atlético de Madrid");
		mockResponse3.setCompleted(false);
		mockResponse3.setLast_update(null);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static ResultApiResponse[] mockBundesligaResultApiResponseArray() {
		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Bayern Munich");
		mockHomeScore1.setScore("2");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("VfL Wolfsburg");
		mockAwayScore1.setScore("2");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("d9c6588b696ac16b667713f90795df93");
		mockResponse1.setSport_key("soccer_germany_bundesliga");
		mockResponse1.setSport_title("Bundesliga");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Bayern Munich");
		mockResponse1.setAway_team("VfL Wolfsburg");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		List<Score> scoreList2 = new ArrayList<>();
		Score mockHomeScore2 = new Score();
		mockHomeScore2.setName("Bayer 04 Leverkusen");
		mockHomeScore2.setScore("2");
		scoreList2.add(mockHomeScore1);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Hertha Berlin");
		mockAwayScore2.setScore("2");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("171b397bafc20dcc6c1fbcfa124a9686");
		mockResponse2.setSport_key("soccer_germany_bundesliga");
		mockResponse2.setSport_title("Bundesliga");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Bayer 04 Leverkusen");
		mockResponse2.setAway_team("Hertha Berlin");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		List<Score> scoreList3 = new ArrayList<>();
		Score mockHomeScore3 = new Score();
		mockHomeScore3.setName("RB Leipzig");
		mockHomeScore3.setScore("0");
		scoreList3.add(mockHomeScore3);
		Score mockAwayScore3 = new Score();
		mockAwayScore3.setName("Borussia Dortmund");
		mockAwayScore3.setScore("2");
		scoreList3.add(mockAwayScore3);

		mockResponse3.setId("4be7bf88e60dd5246a35c46c5d49c12f");
		mockResponse3.setSport_key("soccer_epl");
		mockResponse3.setSport_title("EPL");
		mockResponse3.setCommence_time("2023-04-30T19:45:00Z");
		mockResponse3.setHome_team("RB Leipzig");
		mockResponse3.setAway_team("Borussia Dortmund");
		mockResponse3.setCompleted(true);
		mockResponse3.setLast_update("2023-04-30T22:45:00Z");
		mockResponse3.setScores(scoreList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static ResultApiResponse[] mockSerieAResultApiResponseArray() {
		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		mockResponse1.setId("c4899d1a8129766fd5274de2c9b3a75b");
		mockResponse1.setSport_key("soccer_italy_serie_a");
		mockResponse1.setSport_title("Serie A");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Inter Milan");
		mockResponse1.setAway_team("Fiorentina");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");

		mockResponse2.setId("d67985c60227e89deabf406c0f2af616");
		mockResponse2.setSport_key("soccer_italy_serie_a");
		mockResponse2.setSport_title("Serie A");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("A.S. Roma");
		mockResponse2.setAway_team("Napoli");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");

		mockResponse3.setId("f3e32c2929d70533b2110a147b0c2858");
		mockResponse3.setSport_key("soccer_italy_serie_a");
		mockResponse3.setSport_title("Serie A");
		mockResponse3.setCommence_time("2023-04-30T19:45:00Z");
		mockResponse3.setHome_team("Juventus");
		mockResponse3.setAway_team("AC Milan");
		mockResponse3.setCompleted(true);
		mockResponse3.setLast_update("2023-04-30T22:45:00Z");

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static ResultApiResponse[] mockLigueOneResultApiResponseArray() {
		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Paris Saint-Germain");
		mockHomeScore1.setScore("4");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("Nice");
		mockAwayScore1.setScore("0");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("e4b7831859133ea71c79f8aa2c63bece");
		mockResponse1.setSport_key("soccer_france_ligue_one");
		mockResponse1.setSport_title("Ligue One");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Paris Saint-Germain");
		mockResponse1.setAway_team("Nice");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		List<Score> scoreList2 = new ArrayList<>();
		Score mockHomeScore2 = new Score();
		mockHomeScore2.setName("Marseille");
		mockHomeScore2.setScore("1");
		scoreList2.add(mockHomeScore1);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Lyon");
		mockAwayScore2.setScore("2");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("4bbde77a9239dafb04c20dcfb5c36634");
		mockResponse2.setSport_key("soccer_france_ligue_one");
		mockResponse2.setSport_title("Ligue One");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Marseille");
		mockResponse2.setAway_team("Lyon");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		List<Score> scoreList3 = new ArrayList<>();
		Score mockHomeScore3 = new Score();
		mockHomeScore3.setName("Lille");
		mockHomeScore3.setScore("2");
		scoreList3.add(mockHomeScore3);
		Score mockAwayScore3 = new Score();
		mockAwayScore3.setName("AS Monaco");
		mockAwayScore3.setScore("2");
		scoreList3.add(mockAwayScore3);

		mockResponse3.setId("314f908ddf4c604c28fe930b609b362c");
		mockResponse3.setSport_key("soccer_france_ligue_one");
		mockResponse3.setSport_title("Ligue One");
		mockResponse3.setCommence_time("2023-04-30T19:45:00Z");
		mockResponse3.setHome_team("Lille");
		mockResponse3.setAway_team("AS Monaco");
		mockResponse3.setCompleted(true);
		mockResponse3.setLast_update("2023-04-30T22:45:00Z");
		mockResponse3.setScores(scoreList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static ResultApiResponse[] mockSerieANewResultEvent() {

		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Inter Milan");
		mockHomeScore1.setScore("3");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("Fiorentina");
		mockAwayScore1.setScore("1");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("c4899d1a8129766fd5274de2c9b3a75b");
		mockResponse1.setSport_key("soccer_italy_serie_a");
		mockResponse1.setSport_title("Serie A");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Inter Milan");
		mockResponse1.setAway_team("Fiorentina");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		List<Score> scoreList2 = new ArrayList<>();
		Score mockHomeScore2 = new Score();
		mockHomeScore2.setName("A.S. Roma");
		mockHomeScore2.setScore("2");
		scoreList2.add(mockHomeScore2);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Napoli");
		mockAwayScore2.setScore("2");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("d67985c60227e89deabf406c0f2af616");
		mockResponse2.setSport_key("soccer_italy_serie_a");
		mockResponse2.setSport_title("Serie A");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("A.S. Roma");
		mockResponse2.setAway_team("Napoli");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		List<Score> scoreList3 = new ArrayList<>();
		Score mockHomeScore3 = new Score();
		mockHomeScore3.setName("Juventus");
		mockHomeScore3.setScore("1");
		scoreList3.add(mockHomeScore3);
		Score mockAwayScore3 = new Score();
		mockAwayScore3.setName("AC Milan");
		mockAwayScore3.setScore("2");
		scoreList3.add(mockAwayScore3);

		mockResponse3.setId("f3e32c2929d70533b2110a147b0c2858");
		mockResponse3.setSport_key("soccer_italy_serie_a");
		mockResponse3.setSport_title("Serie A");
		mockResponse3.setCommence_time("2023-04-30T19:45:00Z");
		mockResponse3.setHome_team("Juventus");
		mockResponse3.setAway_team("AC Milan");
		mockResponse3.setCompleted(true);
		mockResponse3.setLast_update("2023-04-30T22:45:00Z");
		mockResponse3.setScores(scoreList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static List<ResultEvent> createMockResultEvents() {

		ResultEvent resultEvent1 = new ResultEvent(BigInteger.valueOf(1000088L), "English Premier League",
				"Brentford vs Aston Villa", new Date(), true, "Brentford", "Aston Villa", "1-1", new Date());
		ResultEvent resultEvent2 = new ResultEvent(BigInteger.valueOf(1000089L), "English Premier League",
				"Burnley vs West Ham United", new Date(), true, "Burnley", "West Ham United", "2-2", new Date());
		ResultEvent resultEvent3 = new ResultEvent(BigInteger.valueOf(1000090L), "English Premier League",
				"Southampton vs Arsenal", new Date(), true, "Southampton", "Arsenal", "0-4", new Date());
		List<ResultEvent> resultEvents = new ArrayList<>();
		resultEvents.add(resultEvent1);
		resultEvents.add(resultEvent2);
		resultEvents.add(resultEvent3);
		return resultEvents;

	}

	public static List<ResultEventMapping> createMockEplResultEventMappingIdsNotInSportsEventMapping() {
		List<ResultEventMapping> mockList = new ArrayList<>();
		ResultEventMapping resultEvent1 = new ResultEventMapping();
		resultEvent1.setEventId(BigInteger.valueOf(9999997L));
		resultEvent1.setApiEventId("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		resultEvent1.setCompType("EPL");
		resultEvent1.setOutcome("01");
		resultEvent1.setScore("4-1");
		resultEvent1.setCompleted(true);
		resultEvent1.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent2 = new ResultEventMapping();
		resultEvent2.setEventId(BigInteger.valueOf(9999998L));
		resultEvent2.setApiEventId("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
		resultEvent2.setCompType("EPL");
		resultEvent2.setOutcome("01");
		resultEvent2.setScore("4-0");
		resultEvent2.setCompleted(true);
		resultEvent2.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent3 = new ResultEventMapping();
		resultEvent3.setEventId(BigInteger.valueOf(9999999L));
		resultEvent3.setApiEventId("cccccccccccccccccccccccccccccccc");
		resultEvent3.setCompType("EPL");
		resultEvent3.setOutcome("02");
		resultEvent3.setScore("1-1");
		resultEvent3.setCompleted(true);
		resultEvent3.setLastUpdatedDt(new Date());

		mockList.add(resultEvent1);
		mockList.add(resultEvent2);
		mockList.add(resultEvent3);
		return mockList;
	}

	public static List<ResultEventMapping> createMockEplResultEventMapping() {
		List<ResultEventMapping> mockList = new ArrayList<>();
		ResultEventMapping resultEvent1 = new ResultEventMapping();
		resultEvent1.setEventId(BigInteger.valueOf(1000003L));
		resultEvent1.setApiEventId("e306340bed661722ad957e5d8c15f798");
		resultEvent1.setCompType("EPL");
		resultEvent1.setOutcome("01");
		resultEvent1.setScore("4-1");
		resultEvent1.setCompleted(true);
		resultEvent1.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent2 = new ResultEventMapping();
		resultEvent2.setEventId(BigInteger.valueOf(1000004L));
		resultEvent2.setApiEventId("2ad957e5d8661722ad957e5d8c15f798");
		resultEvent2.setCompType("EPL");
		resultEvent2.setOutcome("01");
		resultEvent2.setScore("4-0");
		resultEvent2.setCompleted(true);
		resultEvent2.setLastUpdatedDt(new Date());

		ResultEventMapping resultEvent3 = new ResultEventMapping();
		resultEvent3.setEventId(BigInteger.valueOf(1000005L));
		resultEvent3.setApiEventId("1722ad957e661722ad957e5d8c15f798");
		resultEvent3.setCompType("EPL");
		resultEvent3.setOutcome("02");
		resultEvent3.setScore("1-1");
		resultEvent3.setCompleted(true);
		resultEvent3.setLastUpdatedDt(new Date());

		mockList.add(resultEvent1);
		mockList.add(resultEvent2);
		mockList.add(resultEvent3);
		return mockList;
	}

	public static List<ResultEvent> createMappedSuccessEplResultApiResponse() throws ParseException {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		Date startTime1 = dateFormat.parse("2023-05-28T18:45:00Z");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startTime1);
		calendar.add(Calendar.HOUR_OF_DAY, 8);
		startTime1 = calendar.getTime();

		Date startTime2 = dateFormat.parse("2023-05-29T18:45:00Z");
		calendar.setTime(startTime2);
		calendar.add(Calendar.HOUR_OF_DAY, 8);
		startTime2 = calendar.getTime();

		Date startTime3 = dateFormat.parse("2023-05-30T19:45:00Z");
		calendar.setTime(startTime3);
		calendar.add(Calendar.HOUR_OF_DAY, 8);
		startTime3 = calendar.getTime();

		ResultEvent resultEvent1 = new ResultEvent(BigInteger.valueOf(1000003L), "EPL",
				"Tottenham Hotspur vs Leicester City", startTime1, true, "Tottenham Hotspur", "Leicester City", "4-1",
				new Date());
		ResultEvent resultEvent2 = new ResultEvent(BigInteger.valueOf(1000004L), "EPL", "Arsenal vs Sheffield United",
				startTime2, true, "Arsenal", "Sheffield United", "4-0", new Date());
		ResultEvent resultEvent3 = new ResultEvent(BigInteger.valueOf(1000005L), "EPL",
				"Newcastle United vs Manchester United", startTime3, true, "Newcastle United", "Manchester United",
				"1-1", new Date());
		List<ResultEvent> resultEvents = new ArrayList<>();
		resultEvents.add(resultEvent1);
		resultEvents.add(resultEvent2);
		resultEvents.add(resultEvent3);
		return resultEvents;
	}

	public static ResultApiResponse[] mockEplResultApiResponseArrayHomeAndAwayScoreSwapped() {

		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Tottenham Hotspur");
		mockHomeScore1.setScore("4");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("Leicester City");
		mockAwayScore1.setScore("1");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("a085aa8beb661722ad957e5d8c15f798");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("English Premier League");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("Tottenham Hotspur");
		mockResponse1.setAway_team("Leicester City");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		List<Score> scoreList2 = new ArrayList<>();
		Score mockHomeScore2 = new Score();
		mockHomeScore2.setName("Sheffield United");
		mockHomeScore2.setScore("0");
		scoreList2.add(mockHomeScore2);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Arsenal");
		mockAwayScore2.setScore("4");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("f7d5d5a141e21df15f23b5e306340bed");
		mockResponse2.setSport_key("soccer_epl");
		mockResponse2.setSport_title("English Premier League");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Arsenal");
		mockResponse2.setAway_team("Sheffield United");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		List<Score> scoreList3 = new ArrayList<>();
		Score mockHomeScore3 = new Score();
		mockHomeScore3.setName("Manchester United");
		mockHomeScore3.setScore("1");
		scoreList3.add(mockHomeScore3);
		Score mockAwayScore3 = new Score();
		mockAwayScore3.setName("Newcastle United");
		mockAwayScore3.setScore("1");
		scoreList3.add(mockAwayScore3);

		mockResponse3.setId("66ca5a121b5ddc4763cf1708222be377");
		mockResponse3.setSport_key("soccer_epl");
		mockResponse3.setSport_title("English Premier League");
		mockResponse3.setCommence_time("2023-04-30T19:45:00Z");
		mockResponse3.setHome_team("Newcastle United");
		mockResponse3.setAway_team("Manchester United");
		mockResponse3.setCompleted(true);
		mockResponse3.setLast_update("2023-04-30T22:45:00Z");
		mockResponse3.setScores(scoreList3);

		array[0] = mockResponse1;
		array[1] = mockResponse2;
		array[2] = mockResponse3;

		return array;
	}

	public static ResultApiResponse[] mockEplResultApiResponseArrayWithDateFormatError() {

		ResultApiResponse[] array = new ResultApiResponse[1];

		ResultApiResponse mockResponse1 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Tottenham Hotspur");
		mockHomeScore1.setScore("4");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("Leicester City");
		mockAwayScore1.setScore("1");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("a085aa8beb661722ad957e5d8c15f798");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("English Premier League");
		mockResponse1.setCommence_time("ERROR FORMAT");
		mockResponse1.setHome_team("Tottenham Hotspur");
		mockResponse1.setAway_team("Leicester City");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		array[0] = mockResponse1;

		return array;
	}

}
