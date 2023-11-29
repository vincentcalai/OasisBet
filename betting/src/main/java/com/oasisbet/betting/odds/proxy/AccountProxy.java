package com.oasisbet.betting.odds.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.AccountRestResponse;

@FeignClient(name = "account")
public interface AccountProxy {

	@PostMapping("/account/processBet")
	public AccountRestResponse processBet(
			@RequestHeader(value = "Authorization", required = true) String authorizationHeader, BetSlipRest betsInput)
			throws Exception;
}
