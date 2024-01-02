package com.oasisbet.account;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = AccountApplication.class)
@AutoConfigureMockMvc(addFilters = false)
public class TestWithSpringBoot {
	@Autowired
	private Flyway flyway;

	@BeforeEach
	void setUp() {
		this.flyway.clean();
		this.flyway.migrate();
	}
}
