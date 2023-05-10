package com.oasisbet.account.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.AccountView;

@Repository
public interface IAccountDao extends JpaRepository<AccountView, Long> {

	AccountView findByUsrId(Long usrId);

}
