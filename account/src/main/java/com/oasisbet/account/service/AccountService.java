package com.oasisbet.account.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IUserDao;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.request.BetSlipRest;
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

	public AccountView retrieveUserAccountByUsername(String user) {
		UserView userView = userDao.findByUsername(user);
		Long usrId = userView.getId();
		return accountDao.findByUsrId(usrId);
	}

	public AccountRestResponse processDepositAction(AccountVO account) {
		AccountRestResponse response = new AccountRestResponse();
		double depositAmt = account.getDepositAmt();
		double depositLimit = account.getDepositLimit();
		final double newBalanceAmt = account.getBalance() + depositAmt;
		final double newDepositLimit = depositLimit - depositAmt;

		if (newBalanceAmt > Constants.MAX_BAL_AMT) { // validation failed - new balance cannot be more than 199999.99
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_MAX_BAL_AMT);
			return response;
		} else if (newDepositLimit < 0) { // perform validation - reached deposit limit for the month
			response.setStatusCode(2);
			response.setResultMessage(Constants.ERR_OVER_DEPOSIT_LIMIT);
			return response;
		} else { // update new balance and deposit limit to database
			account.setBalance(newBalanceAmt);
			account.setDepositLimit(newDepositLimit);

			AccountView accountView = new AccountView();
			accountView.setAccId(account.getAccId());
			accountView.setUsrId(account.getUsrId());
			accountView.setBalance(account.getBalance());
			accountView.setDepositLimit(account.getDepositLimit());
			accountDao.save(accountView);
			// future implementation - update deposit transaction
		}
		response.setAccount(account);
		response.setResultMessage(Constants.DEPOSIT_ACC_SUCCESS);
		return response;
	}

	public AccountRestResponse processWithdrawalAction(AccountVO account) {
		AccountRestResponse response = new AccountRestResponse();
		double withdrawalAmt = account.getWithdrawalAmt();
		final double newBalanceAmt = account.getBalance() - withdrawalAmt;
		if (newBalanceAmt < Constants.INIT_BAL_AMT) { // validation failed - new balance cannot be less than 0.00
			response.setStatusCode(3);
			response.setResultMessage(Constants.ERR_OVERDRAFT_BAL);
			return response;
		} else {
			account.setBalance(newBalanceAmt);

			AccountView accountView = new AccountView();
			accountView.setAccId(account.getAccId());
			accountView.setUsrId(account.getUsrId());
			accountView.setBalance(account.getBalance());
			accountView.setDepositLimit(account.getDepositLimit());
			accountDao.save(accountView);
		}
		response.setAccount(account);
		response.setResultMessage(Constants.WITHDRAW_ACC_SUCCESS);
		return response;
	}

	public StatusResponse processBet(BetSlipRest betsInput) {
		StatusResponse response = new StatusResponse();
		Long userId = betsInput.getUserId();
		List<BetSubmissionVO> betSubmissionList = betsInput.getBetSlip();
		Optional<AccountView> accountView = this.accountDao.findById(userId);
		double accountBal = 0.0;
		if (accountView.isPresent()) {
			accountBal = accountView.get().getBalance();
		}

		double totalStake = betSubmissionList.stream().mapToDouble(BetSubmissionVO::getBetAmount).reduce(0.0,
				Double::sum);
		if (!accountView.isPresent()) {
			response.setResultMessage(Constants.ERR_USER_ACC_NOT_FOUND);
			response.setStatusCode(1);
		} else if (totalStake > accountBal) {
			response.setResultMessage(Constants.ERR_INSUFFICIENT_BAL);
			response.setStatusCode(2);
		} else {
			// process bet transactions here

		}

		return response;
	}

}
