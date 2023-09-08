package com.oasisbet.account.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import com.oasisbet.account.model.StatusResponse;

@FeignClient(name = "result")
public interface ResultProxy {

	@PostMapping("/result/retrieveResults")
	public StatusResponse retrieveResults() throws Exception;
}