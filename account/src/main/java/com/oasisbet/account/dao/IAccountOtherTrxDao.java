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

	@Query(value = "select trx_dt as dateTime, event_desc as `desc`, 'S' as type, CAST(bet_amt AS DOUBLE) as amount, start_time,  "
			+ "comp_type, bet_type, is_settled, trx_id, bet_selection, odds from tb_bet_trx  "
			+ "where acc_id = :accId and trx_dt >= :startDate union "
			+ "select ptrx.trx_dt as dateTime, btrx.event_desc as `desc`, 'C' as type, ptrx.amount as amount, btrx.start_time, btrx.comp_type, btrx.bet_type, btrx.is_settled, ptrx.trx_id, "
			+ "btrx.bet_selection, btrx.odds from tb_bet_process_trx ptrx "
			+ "inner join tb_bet_trx btrx on ptrx.ref_trx_id = btrx.trx_id "
			+ "where ptrx.acc_id = :accId  and ptrx.trx_dt >= :startDate union "
			+ "select trx_dt, CONCAT(IF(type = 'D', 'Deposit $', 'Withdrawal $'), amount), type as type,  amount, null, null, null, null, null, null, null from tb_other_trx  "
			+ "where acc_id = :accId and trx_dt >= :startDate " + "order by dateTime desc;", nativeQuery = true)
	List<Object[]> getAllFundsInOutTrx(Long accId, Date startDate);

	@Query("SELECT sum(aot.amount) FROM AccountOtherTrxView aot WHERE aot.accId = :accId and aot.type = 'D' and aot.trxDt >= :startDate")
	Double findYtdDeposit(Long accId, Date startDate);

	@Query("SELECT sum(aot.amount) FROM AccountOtherTrxView aot WHERE aot.accId = :accId and aot.type = 'W' and aot.trxDt >= :startDate")
	Double findYtdWithdrawal(Long accId, Date startDate);

	@Query("SELECT sum(aot.amount) FROM AccountOtherTrxView aot WHERE aot.accId = :accId and aot.type = 'D' and aot.trxDt >= :startDate")
	Double findMtdDeposit(Long accId, Date startDate);

}
