package com.oasisbet.result.dao;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.oasisbet.result.model.ResultEventMapping;

@Repository
public interface IResultEventMappingDao extends MongoRepository<ResultEventMapping, BigInteger> {

	List<ResultEventMapping> findByCompleted(boolean completed);

	List<ResultEventMapping> findByCompletedAndLastUpdatedDtBefore(boolean isCompleted, Date date);

	ResultEventMapping findByApiEventId(String apiEventId);

}
