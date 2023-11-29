package com.oasisbet.betting.odds.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.oasisbet.betting.odds.model.BetEvent;
import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.AccountRestResponse;
import com.oasisbet.betting.odds.model.response.BettingRestResponse;
import com.oasisbet.betting.odds.proxy.AccountProxy;
import com.oasisbet.betting.odds.service.OddsService;
import com.oasisbet.betting.odds.util.Constants;

@RestController
@RequestMapping(path = "/odds")
public class OddsController {

	Logger logger = LoggerFactory.getLogger(OddsController.class);

	@Autowired
	public OddsService oddsService;

	@Autowired
	private AccountProxy proxy;

	@GetMapping(value = "/retrieveOdds")
	public BettingRestResponse retrieveOdds(@RequestParam("compType") String compType) {
		// retrieve from sport_event_mapping into results
		BettingRestResponse response = new BettingRestResponse();
		List<BetEvent> betEventList = oddsService.retrieveBetEventByCompType(compType);
		response.setBetEvent(betEventList);
		return response;
	}

	@PostMapping(value = "/bets")
	public AccountRestResponse submitBet(@RequestBody BetSlipRest betsInput) {
		// Retrieve the Authorization header from the incoming request
		ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		String authorizationHeader = attributes.getRequest().getHeader("Authorization");

		// Make the API call to the Account microservice using the Feign Client
		AccountRestResponse response = null;
		try {
			response = proxy.processBet(authorizationHeader, betsInput);
		} catch (Exception e) {
			response = new AccountRestResponse();
			response.setStatusCode(1);
			response.setResultMessage(Constants.BET_PROCESS_ERROR);
			logger.error("error while processing bet ", e);
		}
		return response;
	}

}
