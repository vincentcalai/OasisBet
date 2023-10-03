package com.oasisbet.betting.odds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BettingApplication {

	public static void main(String[] args) {
		SpringApplication.run(BettingApplication.class, args);
	}

}
