package com.oasisbet.account.proxy;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.oasisbet.account.model.ResultEventMapping;

@FeignClient(name = "result")
public interface ResultProxy {

	@GetMapping("/result/retrieveCompletedResults")
	public List<ResultEventMapping> retrieveCompletedResults() throws Exception;
}