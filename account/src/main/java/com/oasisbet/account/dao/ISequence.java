package com.oasisbet.account.dao;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.SequenceView;

@Repository
public interface ISequence extends JpaRepository<SequenceView, String> {
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	SequenceView findBySeqName(String seqName);
}
