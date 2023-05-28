package com.oasisbet.account.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.SequenceView;

@Repository
public interface ISequence extends JpaRepository<SequenceView, String> {

}
