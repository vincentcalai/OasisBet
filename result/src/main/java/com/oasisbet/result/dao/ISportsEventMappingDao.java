package com.oasisbet.result.dao;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.oasisbet.result.model.SportsEventMapping;

@Repository
public interface ISportsEventMappingDao extends MongoRepository<SportsEventMapping, BigInteger> {

	List<SportsEventMapping> findByApiEventId(String apiEventId);

}
