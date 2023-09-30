package com.oasisbet.result.fixture;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.Score;

public class ResultFixture {

	public static ResultApiResponse[] mockEplResultApiResponseArray() {

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

		ResultEvent resultEvent1 = new ResultEvent(1000088L, "English Premier League", "Brentford vs Aston Villa",
				new Date(), true, "Brentford", "Aston Villa", "1-1", new Date());
		ResultEvent resultEvent2 = new ResultEvent(1000089L, "English Premier League", "Burnley vs West Ham United",
				new Date(), true, "Burnley", "West Ham United", "2-2", new Date());
		ResultEvent resultEvent3 = new ResultEvent(1000090L, "English Premier League", "Southampton vs Arsenal",
				new Date(), true, "Southampton", "Arsenal", "0-4", new Date());
		List<ResultEvent> resultEvents = new ArrayList<>();
		resultEvents.add(resultEvent1);
		resultEvents.add(resultEvent2);
		resultEvents.add(resultEvent3);
		return resultEvents;

	}

	public static List<ResultEvent> createMappedSuccessEplResultApiResponse() throws ParseException {

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		Date startTime1 = dateFormat.parse("2023-04-28T18:45:00Z");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startTime1);
		calendar.add(Calendar.HOUR_OF_DAY, 8);
		startTime1 = calendar.getTime();

		Date startTime2 = dateFormat.parse("2023-04-29T18:45:00Z");
		calendar.setTime(startTime2);
		calendar.add(Calendar.HOUR_OF_DAY, 8);
		startTime2 = calendar.getTime();

		Date startTime3 = dateFormat.parse("2023-04-30T19:45:00Z");
		calendar.setTime(startTime3);
		calendar.add(Calendar.HOUR_OF_DAY, 8);
		startTime3 = calendar.getTime();

		ResultEvent resultEvent1 = new ResultEvent(1000001L, "English Premier League",
				"Tottenham Hotspur vs Leicester City", startTime1, true, "Tottenham Hotspur", "Leicester City", "4-1",
				new Date());
		ResultEvent resultEvent2 = new ResultEvent(1000002L, "English Premier League", "Arsenal vs Sheffield United",
				startTime2, true, "Arsenal", "Sheffield United", "4-0", new Date());
		ResultEvent resultEvent3 = new ResultEvent(1000003L, "English Premier League",
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
