package com.oasisbet.account.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.AccountOtherTrxView;

@Repository
public interface IAccountOtherTrxDao extends JpaRepository<AccountOtherTrxView, String> {

	@Query("SELECT aot FROM AccountOtherTrxView aot WHERE aot.type = :typeCd and aot.trxDt >= :startDate")
	List<AccountOtherTrxView> getByTypeByDateRange(String typeCd, Date startDate);

}
