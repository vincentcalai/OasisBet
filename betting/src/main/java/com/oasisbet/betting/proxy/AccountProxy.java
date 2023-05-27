package com.oasisbet.betting.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import com.oasisbet.betting.odds.model.request.BetSlipRest;
import com.oasisbet.betting.odds.model.response.StatusResponse;

@FeignClient(name = "account", url = "localhost:8803")
public interface AccountProxy {

	@PostMapping("/account/processBet")
	public StatusResponse processBet(BetSlipRest betsInput);
}
