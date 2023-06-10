package com.oasisbet.account.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.account.TestWithSpringBoot;
import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IUserDao;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.UserVO;
import com.oasisbet.account.model.request.CreateUserRest;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountView;
import com.oasisbet.account.view.UserView;

public class TestUserService extends TestWithSpringBoot {

	@Autowired
	UserService userService;

	@Autowired
	IUserDao userDao;

	@Autowired
	IAccountDao accountDao;

	@Test
	void testCreateNewUserSuccess() {
		CreateUserRest request = new CreateUserRest();
		UserVO userVo = new UserVO();
		userVo.setEmail("newuser@gmail.com");
		userVo.setUsername("NEWUSERTEST");
		userVo.setPassword("abcd1234");
		userVo.setDelInd("N");
		userVo.setContactNo("98888555");
		userVo.setCreatedDt(new Date());
		request.setUser(userVo);

		StatusResponse response = userService.createUser(request);
		Optional<UserView> optionalUserView = this.userDao.findById(7L);
		UserView userView = optionalUserView.get();

		AccountView accountView = this.accountDao.findByUsrId(7L);

		assertNotNull(userView);
		assertNotNull(accountView);
		assertEquals("NEWUSERTEST", userView.getUsername());
		assertEquals(100003L, accountView.getAccId());
		assertEquals(0, response.getStatusCode());
		assertEquals(Constants.USER_CREATE_SUCCESS, response.getResultMessage());
	}

	@Test
	void testCreateNewUserFail_userExist() {
		CreateUserRest request = new CreateUserRest();
		UserVO userVo = new UserVO();
		userVo.setEmail("newuser@gmail.com");
		userVo.setUsername("TESTUSER");
		userVo.setPassword("abcd1234");
		userVo.setDelInd("N");
		userVo.setContactNo("98888555");
		userVo.setCreatedDt(new Date());
		request.setUser(userVo);

		StatusResponse response = userService.createUser(request);

		Optional<UserView> optionalUserView = this.userDao.findById(7L);

		AccountView accountView = this.accountDao.findByUsrId(7L);

		assertFalse(optionalUserView.isPresent());
		assertNull(accountView);
		assertEquals(2, response.getStatusCode());
		assertEquals(Constants.ERR_USER_EXIST, response.getResultMessage());
	}

}
