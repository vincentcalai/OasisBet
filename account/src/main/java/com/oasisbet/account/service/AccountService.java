package com.oasisbet.account.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IUserDao;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.util.Constants;
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

	public AccountRestResponse setNewBalAndDepositLimit(AccountVO account) {
		AccountRestResponse response = new AccountRestResponse();
		double depositAmt = account.getDepositAmt();
		double depositLimit = account.getDepositLimit();
		final double newBalanceAmt = account.getBalance() + depositAmt;

		if (newBalanceAmt > Constants.MAX_BAL_AMT) { // validation failed - new balance cannot be more than 199999.99
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_MAX_BAL_AMT);
			return response;
		} else if (depositAmt > depositLimit) { // perform validation - reached deposit limit for the month
			response.setStatusCode(2);
			response.setResultMessage(Constants.ERR_OVER_DEPOSIT_LIMIT);
			return response;
		} else { // update new balance and deposit limit to database
			final double newDepositLimit = depositLimit - depositAmt;
			AccountView accountView = new AccountView();
			accountView.setAccId(account.getAccId());
			accountView.setUsrId(account.getUsrId());
			accountView.setBalance(newBalanceAmt);
			accountView.setDepositLimit(newDepositLimit);
			accountDao.save(accountView);
			// future implementation - update deposit transaction
		}
		return response;
	}

}
