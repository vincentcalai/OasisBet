package com.oasisbet.account.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oasisbet.account.dao.IAccountBetTrxDao;
import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IAccountOtherTrxDao;
import com.oasisbet.account.dao.IUserDao;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.TrxHistVO;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountBetTrxView;
import com.oasisbet.account.view.AccountOtherTrxView;
import com.oasisbet.account.view.AccountView;
import com.oasisbet.account.view.UserView;

@Transactional
@Service
public class AccountService {

	@Autowired
	private IAccountDao accountDao;

	@Autowired
	private IUserDao userDao;

	@Autowired
	private IAccountBetTrxDao accountBetTrxDao;

	@Autowired
	private IAccountOtherTrxDao accountOtherTrxDao;

	@Autowired
	private SequenceService sequenceService;

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

			Long accId = account.getAccId();

			// update account details
			AccountView accountView = new AccountView();
			accountView.setAccId(accId);
			accountView.setUsrId(account.getUsrId());
			accountView.setBalance(account.getBalance());
			accountView.setDepositLimit(account.getDepositLimit());
			accountDao.save(accountView);

			// update deposit transaction
			Date currentDateTime = new Date();

			Long nextSeqTrxId = sequenceService.getNextTrxId();
			String trxId = Constants.TRX_TYPE_DEPOSIT + Constants.SLASH + accId + Constants.SLASH + nextSeqTrxId;

			AccountOtherTrxView depositView = new AccountOtherTrxView();
			depositView.setTrxId(trxId);
			depositView.setAccId(accId);
			depositView.setAmount(depositAmt);
			depositView.setType(Constants.TRX_TYPE_DEPOSIT);
			depositView.setTrxDt(currentDateTime);
			accountOtherTrxDao.save(depositView);
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

			Long accId = account.getAccId();

			// update account details
			AccountView accountView = new AccountView();
			accountView.setAccId(accId);
			accountView.setUsrId(account.getUsrId());
			accountView.setBalance(account.getBalance());
			accountView.setDepositLimit(account.getDepositLimit());
			accountDao.save(accountView);

			Date currentDateTime = new Date();

			Long nextSeqTrxId = sequenceService.getNextTrxId();
			String trxId = Constants.TRX_TYPE_WITHDRAWAL + Constants.SLASH + accId + Constants.SLASH + nextSeqTrxId;

			// update withdrawal transaction
			AccountOtherTrxView withdrawalView = new AccountOtherTrxView();
			withdrawalView.setTrxId(trxId);
			withdrawalView.setAccId(accId);
			withdrawalView.setAmount(withdrawalAmt);
			withdrawalView.setType(Constants.TRX_TYPE_WITHDRAWAL);
			withdrawalView.setTrxDt(currentDateTime);
			accountOtherTrxDao.save(withdrawalView);

		}
		response.setAccount(account);
		response.setResultMessage(Constants.WITHDRAW_ACC_SUCCESS);
		return response;
	}

	public StatusResponse processBet(Long userId, List<BetSubmissionVO> betSubmissionList) {
		StatusResponse response = new StatusResponse();
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
			final Long accId = accountView.get().getAccId();
			List<AccountBetTrxView> betTrxList = new ArrayList<>();
			betSubmissionList.forEach(betSubmission -> {
				Long nextSeqTrxId = sequenceService.getNextTrxId();
				Date currentDatetime = new Date();
				String trxId = Constants.TRX_TYPE_BET + Constants.SLASH + accId + Constants.SLASH + nextSeqTrxId;
				AccountBetTrxView accountBetTrxView = new AccountBetTrxView();
				accountBetTrxView.setTrxId(trxId);
				accountBetTrxView.setAccId(accId);
				accountBetTrxView.setBetAmount(betSubmission.getBetAmount());
				accountBetTrxView.setBetSelection(betSubmission.getBetSelection());
				accountBetTrxView.setBetType(betSubmission.getBetTypeCd());
				accountBetTrxView.setCompType(betSubmission.getCompType());
				accountBetTrxView.setEventDesc(betSubmission.getEventDesc());
				accountBetTrxView.setEventId(betSubmission.getEventId());
				accountBetTrxView.setOdds(betSubmission.getOdds());
				accountBetTrxView.setPotentialReturn(betSubmission.getPotentialPayout());
				accountBetTrxView.setSettled(false);
				accountBetTrxView.setStartTime(betSubmission.getStartTime());
				accountBetTrxView.setTrxDateTime(currentDatetime);
				betTrxList.add(accountBetTrxView);
			});
			// persist bet transaction list into db here
			accountBetTrxDao.saveAll(betTrxList);
			Date betPlacedDateTime = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("d MMM yyyy, h:mma");
			String formattedBetPlacedDateTime = dateFormat.format(betPlacedDateTime);
			response.setResultMessage(Constants.BET_PLACED_SUCCESS + formattedBetPlacedDateTime);
		}

		return response;
	}

	public List<TrxHistVO> retrieveTrxHist(String type, String period) {
		String typeCd = "";
		if (type.equals("deposit")) {
			typeCd = "D";
		} else if (type.equals("withdrawal")) {
			typeCd = "W";
		}

		Calendar calendar = Calendar.getInstance();
		Date startDate = null;

		switch (period) {
		case "today":
			LocalDate today = LocalDate.now();
			LocalDateTime startOfDay = today.atStartOfDay();
			startDate = Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
			break;
		case "last7day":
			calendar.add(Calendar.DAY_OF_MONTH, -6); // Subtract 6 days to include the last 7 days
			startDate = calendar.getTime();
			break;
		case "last1mth":
			calendar.add(Calendar.MONTH, -1);
			startDate = calendar.getTime();
			break;
		case "last3mth":
			calendar.add(Calendar.MONTH, -3);
			startDate = calendar.getTime();
			break;
		case "last6mth":
			calendar.add(Calendar.MONTH, -6);
			startDate = calendar.getTime();
			break;
		default:
			throw new IllegalArgumentException("Invalid period: " + period);
		}

		List<AccountOtherTrxView> otherTrxView = this.accountOtherTrxDao.getByTypeByDateRange(typeCd, startDate);

		List<TrxHistVO> trxHistList = new ArrayList<>();
		otherTrxView.forEach(trx -> {
			Double amt = trx.getAmount();
			String fullDesc = trx.getType().equals("D") ? "Deposit" : "Withdrawal";
			TrxHistVO trxHistVo = new TrxHistVO();
			trxHistVo.setAmount(amt);
			trxHistVo.setDateTime(trx.getTrxDt());
			trxHistVo.setDesc(fullDesc);
			trxHistList.add(trxHistVo);
		});

		return trxHistList;
	}

}
