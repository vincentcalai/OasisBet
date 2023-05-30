package com.oasisbet.account.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.AccountBetTrxView;

@Repository
public interface IAccountBetTrxDao extends JpaRepository<AccountBetTrxView, String> {

	@Query("SELECT abt FROM AccountBetTrxView abt WHERE abt.accId = :accId and abt.trxDateTime >= :startDate order by abt.trxDateTime desc")
	List<AccountBetTrxView> getByDateRange(Long accId, Date startDate);

}
