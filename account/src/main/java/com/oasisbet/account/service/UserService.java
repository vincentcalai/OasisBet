package com.oasisbet.account.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IUserDao;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.UserVO;
import com.oasisbet.account.model.request.CreateUserRest;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountView;
import com.oasisbet.account.view.UserView;

@Transactional
@Service
public class UserService {

	@Autowired
	private IUserDao userDao;

	@Autowired
	private IAccountDao accountDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public StatusResponse createUser(CreateUserRest userInput) {
		StatusResponse response = new StatusResponse();
		UserView user = null;
		if (isUsernameUnique(userInput.getUser().getUsername())) {
			UserVO userInputVO = userInput.getUser();
			user = new UserView();
			user.setUsername(userInputVO.getUsername());
			user.setPassword(passwordEncoder.encode(userInputVO.getPassword()));
			user.setEmail(userInputVO.getEmail());
			user.setContactNo(userInputVO.getContactNo());
			user.setDelInd(Constants.NO);
			user.setCreatedDt(new Date());
		} else {
			response.setStatusCode(2);
			response.setResultMessage(Constants.ERR_USER_EXIST);
			return response;
		}

		this.userDao.save(user);

		// create betting transaction account
		AccountView account = new AccountView();
		account.setUsrId(user.getId());
		account.setBalance(Constants.INIT_BAL_AMT);
		account.setDepositLimit(Constants.INIT_DEPOSIT_LIMIT);
		account.setBetLimit(Constants.INIT_BET_LIMIT);
		this.accountDao.save(account);

		response.setResultMessage(Constants.USER_CREATE_SUCCESS);

		return response;
	}

	private boolean isUsernameUnique(String username) {
		UserView user = userDao.findByUsername(username);
		return (user == null);
	}

}
