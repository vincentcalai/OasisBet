package com.oasisbet.betting.odds.util;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Component
@Profile("!test")
public class MongoDBConnection {

	private static MongoDBConnection instance = null;
	private MongoClient mongoClient;
	private MongoDatabase database;
	private MongoCollection<Document> collection;

	private static MongoDBConfig mongoDBConfig;

	@Autowired
	public void initMongoDBConnection(MongoDBConfig mongoDBConfig) {
		MongoDBConnection.mongoDBConfig = mongoDBConfig;
	}

	@Autowired
	private MongoDBConnection(MongoDBConfig mongoDBConfig) {
		// private constructor to prevent instantiation outside of the class
		this.mongoClient = MongoClients.create(mongoDBConfig.getConnectionUrl());
		this.database = mongoClient.getDatabase(mongoDBConfig.getDatabaseName());
		this.collection = database.getCollection(mongoDBConfig.getCollectionName());
	}

	public static synchronized MongoDBConnection getInstance() {
		// lazy initialization - only create instance when it is requested for the first
		// time
		if (instance == null) {
			instance = new MongoDBConnection(mongoDBConfig);
		}
		return instance;
	}

	public MongoCollection<Document> getCollection() {
		return collection;
	}
}
