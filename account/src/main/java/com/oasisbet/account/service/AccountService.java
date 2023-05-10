package com.oasisbet.account.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IUserDao;
import com.oasisbet.account.view.AccountView;
import com.oasisbet.account.view.UserView;

@Transactional
@Service
public class AccountService {

	@Autowired
	private IAccountDao accountDao;

	@Autowired
	private IUserDao userDao;

	public AccountView retrieveUserAccount(String user) {
		UserView userView = userDao.findByUsername(user);
		Long usrId = userView.getId();
		AccountView accountView = accountDao.findByUsrId(usrId);
		return accountView;
	}

}
