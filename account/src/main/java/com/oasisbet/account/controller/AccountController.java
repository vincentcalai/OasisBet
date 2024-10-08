package com.oasisbet.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.PersonalInfoVO;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.TrxHistVO;
import com.oasisbet.account.model.request.AccountRest;
import com.oasisbet.account.model.request.BetSlipRest;
import com.oasisbet.account.model.request.UpdateAccountInfoRest;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.model.response.TrxHistRestResponse;
import com.oasisbet.account.service.AccountService;
import com.oasisbet.account.util.Constants;

@RestController
@RequestMapping(path = "/account")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@GetMapping(value = "/retrieveAccDetails")
	public AccountRestResponse retrieveAccDetails(@RequestParam String user) {
		AccountRestResponse response = new AccountRestResponse();
		AccountVO accountVo = this.accountService.retrieveUserAccountByUsername(user);
		if (accountVo == null) {
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_USER_ACC_NOT_FOUND);
			return response;
		}
		PersonalInfoVO personalInfoVo = this.accountService.retrieveUserByUsername(user);
		if (personalInfoVo == null) {
			response.setStatusCode(2);
			response.setResultMessage(Constants.ERR_USER_NOT_FOUND);
			return response;
		}
		response.setAccount(accountVo);
		response.setPersonalInfo(personalInfoVo);
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

	@PutMapping(value = "/updateAccInfo")
	public StatusResponse updateAccInfo(@RequestBody UpdateAccountInfoRest updateAccountInfoRest) {

		StatusResponse response = new StatusResponse();
		String username = updateAccountInfoRest.getAccountDetails().getUsername();
		String oldPassword = updateAccountInfoRest.getAccountDetails().getOldPassword();
		String newPassword = updateAccountInfoRest.getAccountDetails().getNewPassword();
		String email = updateAccountInfoRest.getAccountDetails().getEmail();
		String contactNo = updateAccountInfoRest.getAccountDetails().getContactNo();

		if (email != null && contactNo != null) {
			return accountService.updateAccInfo(username, email, contactNo, response);
		}

		return accountService.updateAccPassword(username, oldPassword, newPassword, response);
	}

	@DeleteMapping(value = "/terminateAcc/{username}")
	public StatusResponse terminateAcc(@PathVariable String username) {
		StatusResponse response = new StatusResponse();
		return accountService.deleteAcc(username, response);
	}

	@PostMapping(value = "/processBet")
	public AccountRestResponse processBet(@RequestBody BetSlipRest betsInput) {
		List<BetSubmissionVO> betSubmissionList = betsInput.getBetSlip();
		Long userId = betsInput.getUserId();
		return accountService.processBet(userId, betSubmissionList);
	}

}
