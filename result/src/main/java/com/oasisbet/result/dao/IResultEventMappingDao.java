package com.oasisbet.result.dao;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.oasisbet.result.model.ResultEventMapping;

@Repository
public interface IResultEventMappingDao extends MongoRepository<ResultEventMapping, BigInteger> {

	List<ResultEventMapping> findByCompleted(boolean completed);

	@Query("DELETE FROM ResultEventMapping r WHERE r.completedDt < :thirtyDaysAgo")
	void deleteRecordsOlderThanThirtyDays(Date thirtyDaysAgo);

	ResultEventMapping findByApiEventId(String apiEventId);

}
