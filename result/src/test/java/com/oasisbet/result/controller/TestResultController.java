package com.oasisbet.result.controller;

import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oasisbet.result.TestBaseSetup;
import com.oasisbet.result.fixture.ResultFixture;
import com.oasisbet.result.model.ResultApiResponse;
import com.oasisbet.result.model.ResultEvent;
import com.oasisbet.result.model.ResultEventMapping;
import com.oasisbet.result.model.ResultRestResponse;
import com.oasisbet.result.service.ResultService;

@ExtendWith(MockitoExtension.class)
class TestResultController extends TestBaseSetup {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private RestTemplate mockRestTemplate;

	@MockBean
	private ResultService resultService;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void retrieveResultsSuccess() throws JsonProcessingException, Exception {
		String compType = "soccer_epl";
		List<ResultEvent> mockResults = ResultFixture.createMockResultEvents();

		ResultApiResponse[] mockBody = ResultFixture.mockEplResultApiResponseArray();
		ResponseEntity<Object> mockResponseEntity = new ResponseEntity<>(mockBody, HttpStatus.OK);

		when(mockRestTemplate.getForEntity(Mockito.anyString(), Mockito.any())).thenReturn(mockResponseEntity);

		Mockito.when(resultService.processMapping(Mockito.anyList(), Mockito.any(LocalDateTime.class),
				Mockito.any(LocalDateTime.class))).thenReturn(mockResults);

		ResultRestResponse expectedResponse = new ResultRestResponse();
		expectedResponse.setResultEvent(mockResults);

		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/result/retrieveResults")
				.param("compType", compType).contentType(MediaType.APPLICATION_JSON);

		mockMvc.perform(requestBuilder).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(expectedResponse)));
	}

	@Test
	void testRetrieveCompletedResultsSuccess() throws Exception {
		List<ResultEventMapping> expectedResults = new ArrayList<>();

		when(resultService.retrieveCompletedResults()).thenReturn(expectedResults);

		mockMvc.perform(MockMvcRequestBuilders.get("/result/retrieveCompletedResults"))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(expectedResults)));
	}
}
