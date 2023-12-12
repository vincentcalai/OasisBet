package com.oasisbet.result.model;

import java.math.BigInteger;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "result_event_mapping")
@Getter
@Setter
public class ResultEventMapping {
	@Id
	private BigInteger eventId;
	private String apiEventId;
	private String compType;
	private String score;
	private String outcome;
	private boolean completed;
	private Date lastUpdatedDt;
}
