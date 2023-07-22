package com.oasisbet.result.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!test")
public class MongoDBConfig {
	@Value("${mongodb.client.connectionUrl}")
	private String connectionUrl;
	@Value("${mongodb.client.databaseName}")
	private String databaseName;
	@Value("${mongodb.client.sportsEventMapping.collectionName}")
	private String sportsEventMappingCollectionName;
	@Value("${mongodb.client.resultEventMapping.collectionName}")
	private String resultEventMappingCollectionName;

	public String getConnectionUrl() {
		return connectionUrl;
	}

	public void setConnectionUrl(String connectionUrl) {
		this.connectionUrl = connectionUrl;
	}

	public String getDatabaseName() {
		return databaseName;
	}

	public void setDatabaseName(String databaseName) {
		this.databaseName = databaseName;
	}

	public String getSportsEventMappingCollectionName() {
		return sportsEventMappingCollectionName;
	}

	public void setSportsEventMappingCollectionName(String collectionName) {
		this.sportsEventMappingCollectionName = collectionName;
	}

	public String getResultEventMappingCollectionName() {
		return resultEventMappingCollectionName;
	}

	public void setResultEventMappingCollectionName(String resultEventMappingCollectionName) {
		this.resultEventMappingCollectionName = resultEventMappingCollectionName;
	}

}