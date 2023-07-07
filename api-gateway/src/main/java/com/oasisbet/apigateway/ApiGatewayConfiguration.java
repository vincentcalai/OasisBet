package com.oasisbet.apigateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGatewayConfiguration {

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes().route("betting_route", r -> r.path("/odds/**").uri("lb://BETTING"))
				.route("result_route", r -> r.path("/result/**").uri("lb://RESULT"))
				.route("account_route", r -> r.path("/account/**").uri("lb://ACCOUNT"))
				.route("user_route", r -> r.path("/user/**").uri("lb://ACCOUNT")).build();
	}

}
