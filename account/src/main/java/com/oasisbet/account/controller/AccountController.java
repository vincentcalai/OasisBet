package com.oasisbet.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.TrxHistVO;
import com.oasisbet.account.model.request.AccountRest;
import com.oasisbet.account.model.request.BetSlipRest;
import com.oasisbet.account.model.request.UpdateAccountPwRest;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.model.response.TrxHistRestResponse;
import com.oasisbet.account.service.AccountService;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.UserView;

@RestController
@RequestMapping(path = "/account")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@GetMapping(value = "/retrieveAccDetails")
	public AccountRestResponse retrieveAccDetails(@RequestParam String user) {
		AccountRestResponse response = new AccountRestResponse();
		AccountVO accountVo = this.accountService.retrieveUserAccountByUsername(user);
		if (accountVo == null) {
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_USER_ACC_NOT_FOUND);
		}
		response.setAccount(accountVo);
		return response;
	}

	@GetMapping(value = "/retrieveYtdAmounts")
	public AccountRestResponse retrieveYtdAmounts(@RequestParam Long accId) {
		AccountRestResponse response = new AccountRestResponse();
		AccountVO accountVo = this.accountService.retrieveYtdAmounts(accId);
		response.setAccount(accountVo);
		return response;
	}

	@GetMapping(value = "/retrieveMtdAmounts")
	public AccountRestResponse retrieveMtdAmounts(@RequestParam Long accId) {
		AccountRestResponse response = new AccountRestResponse();
		AccountVO accountVo = this.accountService.retrieveMtdAmounts(accId);
		response.setAccount(accountVo);
		return response;
	}

	@GetMapping(value = "/retrieveTrx")
	public TrxHistRestResponse retrieveTrx(@RequestParam Long accId, String type, String period) {
		TrxHistRestResponse response = new TrxHistRestResponse();
		List<TrxHistVO> trxHistVo = null;
		try {
			trxHistVo = this.accountService.retrieveTrxHist(accId, type, period);
			response.setTrxHistList(trxHistVo);
		} catch (Exception e) {
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_RETRIEVE_TRX);
			e.printStackTrace();
		}
		return response;
	}

	@PutMapping(value = "/updateAccDetails")
	public AccountRestResponse updateAccDetails(@RequestBody AccountRest accountRest) {
		AccountVO account = accountRest.getAccount();
		String actionType = account.getActionType();
		if (actionType.equals("D")) {
			return accountService.processDepositAction(account);
		} else if (actionType.equals("W")) {
			return accountService.processWithdrawalAction(account);
		} else {
			return accountService.processLimitAction(account);
		}
	}

	@PutMapping(value = "/updateAccPassword")
	public StatusResponse updateAccPassword(@RequestBody UpdateAccountPwRest updateAccountPwRest) {

		StatusResponse response = new StatusResponse();
		String username = updateAccountPwRest.getAccountPw().getUsername();
		String oldPassword = updateAccountPwRest.getAccountPw().getOldPassword();
		String newPassword = updateAccountPwRest.getAccountPw().getNewPassword();

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPassword));
		} catch (DisabledException e) {
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_USER_DISABLED);
			return response;
		} catch (BadCredentialsException e) {
			response.setStatusCode(2);
			response.setResultMessage(Constants.ERR_USER_INVALID_CREDENTIAL);
			return response;
		}

		UserView userView = accountService.updateAccPassword(username, newPassword);
		if (userView == null) {
			response.setStatusCode(3);
			response.setResultMessage(Constants.ERR_USER_ACC_NOT_FOUND);
			return response;

		}
		response.setResultMessage(Constants.ACC_PW_UPDATE_SUCESSS);
		return response;
	}

	@PostMapping(value = "/processBet")
	public AccountRestResponse processBet(@RequestBody BetSlipRest betsInput) {
		List<BetSubmissionVO> betSubmissionList = betsInput.getBetSlip();
		Long userId = betsInput.getUserId();
		return accountService.processBet(userId, betSubmissionList);
	}

}
