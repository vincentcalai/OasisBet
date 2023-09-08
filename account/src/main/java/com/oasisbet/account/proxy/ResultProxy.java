package com.oasisbet.account.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.oasisbet.account.model.StatusResponse;

@FeignClient(name = "result")
public interface ResultProxy {

	@GetMapping("/result/retrieveCompletedResults")
	public StatusResponse retrieveCompletedResults();
}