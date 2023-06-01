package com.oasisbet.betting.util;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class MongoDBConnection {
	private static MongoDBConnection instance = null;
	private MongoClient mongoClient;
	private MongoDatabase database;
	private MongoCollection<Document> collection;

	private MongoDBConnection() {
		// private constructor to prevent instantiation outside of the class
		this.mongoClient = MongoClients.create("mongodb://localhost:27017");
		this.database = mongoClient.getDatabase("OasisBet");
		this.collection = database.getCollection("sports_event_mapping");
	}

	public static synchronized MongoDBConnection getInstance() {
		// lazy initialization - only create instance when it is requested for the first
		// time
		if (instance == null) {
			instance = new MongoDBConnection();
		}
		return instance;
	}

	public MongoCollection<Document> getCollection() {
		return collection;
	}
}
