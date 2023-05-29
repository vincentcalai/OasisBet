package com.oasisbet.account.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.model.response.TrxHistRestResponse;
import com.oasisbet.account.service.AccountService;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountView;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/account")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@GetMapping(value = "/retrieveAccDetails")
	public AccountRestResponse retrieveAccDetails(@RequestParam String user) {
		AccountRestResponse response = new AccountRestResponse();
		AccountView accountView = this.accountService.retrieveUserAccountByUsername(user);
		AccountVO accountVo = null;
		if (accountView != null) {
			accountVo = new AccountVO();
			accountVo.setAccId(accountView.getAccId());
			accountVo.setUsrId(accountView.getUsrId());
			accountVo.setBalance(accountView.getBalance());
			accountVo.setDepositLimit(accountView.getDepositLimit());
		} else {
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_USER_ACC_NOT_FOUND);
		}
		response.setAccount(accountVo);
		return response;
	}

	@GetMapping(value = "/retrieveTrx")
	public TrxHistRestResponse retrieveTrx(@RequestParam String type, String period) {
		TrxHistRestResponse response = new TrxHistRestResponse();
		List<TrxHistVO> trxHistVo = this.accountService.retrieveTrxHist(type, period);
		response.setTrxHistList(trxHistVo);
		return response;
	}

	@PutMapping(value = "/updateAccDetails")
	public AccountRestResponse updateAccDetails(@RequestBody AccountRest accountRest) {
		AccountVO account = accountRest.getAccount();
		String actionType = account.getActionType();
		return actionType.equals("D") ? accountService.processDepositAction(account)
				: accountService.processWithdrawalAction(account);
	}

	@PostMapping(value = "/processBet")
	public StatusResponse processBet(@RequestBody BetSlipRest betsInput) {
		List<BetSubmissionVO> betSubmissionList = betsInput.getBetSlip();
		Long userId = betsInput.getUserId();
		return accountService.processBet(userId, betSubmissionList);
	}

}
