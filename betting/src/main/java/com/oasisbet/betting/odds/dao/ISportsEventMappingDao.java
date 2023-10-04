package com.oasisbet.betting.odds.dao;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.oasisbet.betting.odds.model.SportsEventMapping;

@Repository
public interface ISportsEventMappingDao extends MongoRepository<SportsEventMapping, BigInteger> {

	List<SportsEventMapping> findByApiEventId(String apiEventId);

	Optional<SportsEventMapping> findFirstByCompTypeOrderByEventIdDesc(String compType);

	List<SportsEventMapping> findByCompTypeAndCompletedFalse(String compType);

	List<SportsEventMapping> findByCreateDtBefore(Date ninetyDaysAgo);

}
