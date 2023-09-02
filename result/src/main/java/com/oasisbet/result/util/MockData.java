package com.oasisbet.result.util;

import java.util.ArrayList;
import java.util.List;

import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.Score;

public class MockData {

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

		mockResponse1.setId("a085aa8beb661722ad957e5d8c15f798");
		mockResponse1.setSport_key("soccer_epl");
		mockResponse1.setSport_title("EPL");
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
		scoreList2.add(mockHomeScore1);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Sheffield United");
		mockAwayScore2.setScore("0");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("f7d5d5a141e21df15f23b5e306340bed");
		mockResponse2.setSport_key("soccer_epl");
		mockResponse2.setSport_title("EPL");
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

		mockResponse3.setId("66ca5a121b5ddc4763cf1708222be377");
		mockResponse3.setSport_key("soccer_epl");
		mockResponse3.setSport_title("EPL");
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

	public static ResultApiResponse[] mockLaLigaOddsApiResponseArray() {
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

		mockResponse1.setId("d4e3a23b451b0c26782e4f5e7d8f9321");
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

		mockResponse2.setId("8f2b58e32b1c4d10d9e6718214a5246d");
		mockResponse2.setSport_key("soccer_laliga");
		mockResponse2.setSport_title("La Liga");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Valencia");
		mockResponse2.setAway_team("Sevilla");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		mockResponse3.setId("4ad1e71603e51a092558022eefa20bbc");
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

	public static ResultApiResponse[] mockBundesligaOddsApiResponseArray() {
		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("Bayern Munich");
		mockHomeScore1.setScore("6");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("VfL Wolfsburg");
		mockAwayScore1.setScore("1");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("74c9ae71b731a5e2bc7631ff0dca54e9");
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

		mockResponse2.setId("8f26dbb905e61d37a2c84c9428b1e98f");
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

		mockResponse3.setId("6bfc7d4b024f39859f731e739e9e9fe2");
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

	public static ResultApiResponse[] mockSerieAOddsApiResponseArray() {
		ResultApiResponse[] array = new ResultApiResponse[3];

		ResultApiResponse mockResponse1 = new ResultApiResponse();
		ResultApiResponse mockResponse2 = new ResultApiResponse();
		ResultApiResponse mockResponse3 = new ResultApiResponse();

		List<Score> scoreList1 = new ArrayList<>();
		Score mockHomeScore1 = new Score();
		mockHomeScore1.setName("A.S. Roma");
		mockHomeScore1.setScore("0");
		scoreList1.add(mockHomeScore1);
		Score mockAwayScore1 = new Score();
		mockAwayScore1.setName("Napoli");
		mockAwayScore1.setScore("1");
		scoreList1.add(mockAwayScore1);

		mockResponse1.setId("d67985c60227e89deabf406c0f2af616");
		mockResponse1.setSport_key("soccer_italy_serie_a");
		mockResponse1.setSport_title("Serie A");
		mockResponse1.setCommence_time("2023-04-28T18:45:00Z");
		mockResponse1.setHome_team("A.S. Roma");
		mockResponse1.setAway_team("Napoli");
		mockResponse1.setCompleted(true);
		mockResponse1.setLast_update("2023-04-29T18:45:00Z");
		mockResponse1.setScores(scoreList1);

		List<Score> scoreList2 = new ArrayList<>();
		Score mockHomeScore2 = new Score();
		mockHomeScore2.setName("Inter Milan");
		mockHomeScore2.setScore("1");
		scoreList2.add(mockHomeScore1);
		Score mockAwayScore2 = new Score();
		mockAwayScore2.setName("Fiorentina");
		mockAwayScore2.setScore("2");
		scoreList2.add(mockAwayScore2);

		mockResponse2.setId("c4899d1a8129766fd5274de2c9b3a75b");
		mockResponse2.setSport_key("soccer_italy_serie_a");
		mockResponse2.setSport_title("Serie A");
		mockResponse2.setCommence_time("2023-04-29T18:45:00Z");
		mockResponse2.setHome_team("Inter Milan");
		mockResponse2.setAway_team("Fiorentina");
		mockResponse2.setCompleted(true);
		mockResponse2.setLast_update("2023-04-30T18:45:00Z");
		mockResponse2.setScores(scoreList2);

		List<Score> scoreList3 = new ArrayList<>();
		Score mockHomeScore3 = new Score();
		mockHomeScore3.setName("Juventus");
		mockHomeScore3.setScore("0");
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

	public static ResultApiResponse[] mockLigueOneOddsApiResponseArray() {
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

		mockResponse1.setId("4d7e79c8f19a620caea24c05ebdce377");
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

		mockResponse2.setId("a2e81b5f49a99cc20b58de1ad5ae98a6");
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

		mockResponse3.setId("20d0c5053a0914f753cb2fcf6f84416e");
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

}
