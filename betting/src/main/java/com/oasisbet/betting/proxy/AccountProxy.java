package com.oasisbet.betting.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import com.oasisbet.betting.odds.model.request.BetSlipRest;

@FeignClient(name = "account", url = "localhost:8803")
public interface AccountProxy {

	@PostMapping("/account/processBet")
	public ResponseEntity<String> processBet(BetSlipRest betsInput);
}
