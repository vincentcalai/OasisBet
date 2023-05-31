package com.oasisbet.account.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.AccountBetProcessTrxView;

@Repository
public interface IAccountBetProcessTrxDao extends JpaRepository<AccountBetProcessTrxView, Long> {

}
