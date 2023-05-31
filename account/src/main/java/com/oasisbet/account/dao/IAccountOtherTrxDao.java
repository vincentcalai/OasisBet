package com.oasisbet.account.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.AccountOtherTrxView;

@Repository
public interface IAccountOtherTrxDao extends JpaRepository<AccountOtherTrxView, String> {

	@Query("SELECT aot FROM AccountOtherTrxView aot WHERE aot.accId = :accId and aot.type = :typeCd and aot.trxDt >= :startDate order by aot.trxDt desc")
	List<AccountOtherTrxView> getByTypeByDateRange(Long accId, String typeCd, Date startDate);

	@Query(value = "select trx_dt as dateTime, event_desc as `desc`, CAST(bet_amt AS DOUBLE) as amount from tb_bet_trx "
			+ "where acc_id = :accId and trx_dt >= :startDate union "
			+ "select trx_dt, CONCAT(IF(type = 'D', 'Deposit $', 'Withdrawal $'), amount), amount from tb_other_trx "
			+ "where acc_id = :accId and trx_dt >= :startDate order by dateTime desc", nativeQuery = true)
	List<Object[]> getAllFundsInOutTrx(Long accId, Date startDate);

	@Query("SELECT sum(aot.amount) FROM AccountOtherTrxView aot WHERE aot.accId = :accId and aot.type = 'D' and aot.trxDt >= :startDate")
	Double findYtdDeposit(Long accId, Date startDate);

	@Query("SELECT sum(aot.amount) FROM AccountOtherTrxView aot WHERE aot.accId = :accId and aot.type = 'W' and aot.trxDt >= :startDate")
	Double findYtdWithdrawal(Long accId, Date startDate);

}
