package com.oasisbet.account.service;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oasisbet.account.dao.IAccountBetProcessTrxDao;
import com.oasisbet.account.dao.IAccountBetTrxDao;
import com.oasisbet.account.dao.IAccountDao;
import com.oasisbet.account.dao.IAccountOtherTrxDao;
import com.oasisbet.account.dao.IUserDao;
import com.oasisbet.account.model.AccountVO;
import com.oasisbet.account.model.BetSubmissionVO;
import com.oasisbet.account.model.ResultEventMapping;
import com.oasisbet.account.model.TrxBetDetailsVO;
import com.oasisbet.account.model.TrxHistVO;
import com.oasisbet.account.model.response.AccountRestResponse;
import com.oasisbet.account.proxy.ResultProxy;
import com.oasisbet.account.util.Constants;
import com.oasisbet.account.view.AccountBetProcessTrxView;
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
	private IAccountBetProcessTrxDao accountBetProcessTrxDao;

	@Autowired
	private IAccountOtherTrxDao accountOtherTrxDao;

	@Autowired
	private SequenceService sequenceService;

	@Autowired
	private ResultProxy proxy;

	Logger logger = LoggerFactory.getLogger(AccountService.class);

	public AccountVO retrieveUserAccountByUsername(String user) {
		UserView userView = userDao.findByUsername(user);
		AccountVO accountVo = null;
		if (userView == null) {
			return accountVo;
		}
		Long usrId = userView.getId();
		AccountView accountView = accountDao.findByUsrId(usrId);
		if (accountView != null) {
			accountVo = new AccountVO();
			accountVo.setAccId(accountView.getAccId());
			accountVo.setUsrId(accountView.getUsrId());
			accountVo.setBalance(accountView.getBalance());
			accountVo.setDepositLimit(accountView.getDepositLimit());
			accountVo.setBetLimit(accountView.getBetLimit());
		}
		return accountVo;
	}

	public AccountVO retrieveYtdAmounts(Long accId) {
		AccountVO accountVo = new AccountVO();
		LocalDate today = LocalDate.now();
		LocalDate startOfYear = today.withDayOfYear(1);
		LocalDateTime startOfDay = startOfYear.atStartOfDay();
		Date startDate = Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());

		Double ytdDepositAmount = accountOtherTrxDao.findYtdDeposit(accId, startDate);
		Double ytdWithdrawalAmount = accountOtherTrxDao.findYtdWithdrawal(accId, startDate);
		ytdDepositAmount = ytdDepositAmount == null ? 0.0 : ytdDepositAmount;
		ytdWithdrawalAmount = ytdWithdrawalAmount == null ? 0.0 : ytdWithdrawalAmount;
		accountVo.setYtdDepositAmt(ytdDepositAmount);
		accountVo.setYtdWithdrawalAmt(ytdWithdrawalAmount);
		return accountVo;
	}

	public AccountVO retrieveMtdAmounts(Long accId) {
		AccountVO accountVo = new AccountVO();
		LocalDate today = LocalDate.now();
		LocalDate startOfMonth = today.withDayOfMonth(1);
		LocalDateTime startOfDay = startOfMonth.atStartOfDay();
		Date startDate = Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());

		Double mtdBetAmount = accountBetTrxDao.findMtdBetAmount(accId, startDate);
		mtdBetAmount = mtdBetAmount == null ? 0.0 : mtdBetAmount;
		Double mtdDepositAmount = accountOtherTrxDao.findMtdDeposit(accId, startDate);
		mtdDepositAmount = mtdDepositAmount == null ? 0.0 : mtdDepositAmount;
		accountVo.setMtdBetAmount(mtdBetAmount);
		accountVo.setMtdDepositAmt(mtdDepositAmount);
		return accountVo;
	}

	public AccountRestResponse processDepositAction(AccountVO account) {
		AccountRestResponse response = new AccountRestResponse();
		double depositAmt = account.getDepositAmt();
		double depositLimit = account.getDepositLimit();

		Long accId = account.getAccId();
		LocalDate today = LocalDate.now();
		LocalDate startOfMonth = today.withDayOfMonth(1);
		LocalDateTime startOfDay = startOfMonth.atStartOfDay();
		Date startDate = Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
		Double mtdDepositAmount = accountOtherTrxDao.findMtdDeposit(accId, startDate);
		mtdDepositAmount = mtdDepositAmount == null ? 0.0 : mtdDepositAmount;

		final double newBalanceAmt = account.getBalance() + depositAmt;
		final double newDepositLimit = depositLimit - mtdDepositAmount - depositAmt;

		if (newBalanceAmt > Constants.MAX_BAL_AMT) { // validation failed - new balance cannot be more than 199999.99
			response.setStatusCode(1);
			response.setResultMessage(Constants.ERR_MAX_BAL_AMT);
			return response;
		} else if (newDepositLimit < 0) { // perform validation - reached deposit limit for the month
			response.setStatusCode(2);
			response.setResultMessage(Constants.ERR_OVER_DEPOSIT_LIMIT);
			return response;
		} else { // update new balance to database
			account.setBalance(newBalanceAmt);

			// update account details
			AccountView accountView = new AccountView();
			accountView.setAccId(accId);
			accountView.setUsrId(account.getUsrId());
			accountView.setBalance(account.getBalance());
			accountView.setDepositLimit(account.getDepositLimit());
			accountView.setBetLimit(account.getBetLimit());
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
			accountView.setBetLimit(account.getBetLimit());
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

	public AccountRestResponse processLimitAction(AccountVO account) {
		AccountRestResponse response = new AccountRestResponse();
		Long accId = account.getAccId();

		// update account details
		AccountView accountView = new AccountView();
		accountView.setAccId(accId);
		accountView.setUsrId(account.getUsrId());
		accountView.setBalance(account.getBalance());
		accountView.setDepositLimit(account.getDepositLimit());
		accountView.setBetLimit(account.getBetLimit());
		accountDao.save(accountView);

		response.setAccount(account);
		response.setResultMessage(Constants.CHANGE_LIMIT_ACC_SUCCESS);
		return response;
	}

	public AccountRestResponse processBet(Long accId, List<BetSubmissionVO> betSubmissionList) {
		AccountRestResponse response = new AccountRestResponse();
		AccountVO account = new AccountVO();
		account.setAccId(accId);
		Optional<AccountView> accountViewOptional = this.accountDao.findById(accId);
		double accountBal = 0.0;
		if (accountViewOptional.isPresent()) {
			accountBal = accountViewOptional.get().getBalance();
		}

		double totalStake = betSubmissionList.stream().mapToDouble(BetSubmissionVO::getBetAmount).reduce(0.0,
				Double::sum);

		if (!accountViewOptional.isPresent()) {
			response.setResultMessage(Constants.ERR_USER_ACC_NOT_FOUND);
			response.setStatusCode(1);
		} else if (totalStake > accountBal) {
			response.setResultMessage(Constants.ERR_INSUFFICIENT_BAL);
			response.setStatusCode(2);
		} else {
			// update account balance
			AccountView accountView = accountViewOptional.get();
			accountBal -= totalStake;
			accountView.setBalance(accountBal);

			// process bet transactions here
			List<AccountBetTrxView> betTrxList = new ArrayList<>();
			List<AccountBetProcessTrxView> betProcessTrxList = new ArrayList<>();

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

				AccountBetProcessTrxView accountBetProcessTrxView = new AccountBetProcessTrxView();
				accountBetProcessTrxView.setTrxId(trxId);
				accountBetProcessTrxView.setAccId(accId);
				accountBetProcessTrxView.setAmount(betSubmission.getBetAmount());
				accountBetProcessTrxView.setType(Constants.TRX_TYPE_BET);
				accountBetProcessTrxView.setTrxDt(currentDatetime);
				betProcessTrxList.add(accountBetProcessTrxView);
			});
			// persist bet transaction list in db
			accountBetTrxDao.saveAll(betTrxList);
			accountBetProcessTrxDao.saveAll(betProcessTrxList);
			// persist user account balance in db
			this.accountDao.save(accountView);

			account.setBalance(accountBal);
			response.setAccount(account);

			Date betPlacedDateTime = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("d MMM yyyy, h:mma");
			String formattedBetPlacedDateTime = dateFormat.format(betPlacedDateTime);
			response.setResultMessage(Constants.BET_PLACED_SUCCESS + formattedBetPlacedDateTime);
		}

		return response;
	}

	public List<TrxHistVO> retrieveTrxHist(Long accId, String type, String period) {
		String typeCd = Constants.EMPTY_STRING;
		if (Constants.DEPOSIT_CD.equals(type)) {
			typeCd = Constants.TRX_TYPE_DEPOSIT;
		} else if (Constants.WITHDRAWAL_CD.equals(type)) {
			typeCd = Constants.TRX_TYPE_WITHDRAWAL;
		} else if (Constants.FUNDS_CD.equals(type)) {
			typeCd = Constants.TRX_TYPE_ALL_FUNDS;
		} else if (Constants.SPORTS_BET_CD.equals(type)) {
			typeCd = Constants.TRX_TYPE_SPORTS_BET;
		}

		Date startDate = genStartDate(period);

		List<AccountOtherTrxView> otherTrxView = null;
		List<AccountBetTrxView> betTrxView = null;
		List<Object[]> allFundsTrx = null;
		List<TrxHistVO> trxHistList = new ArrayList<>();

		if (Constants.TRX_TYPE_ALL_FUNDS.equals(typeCd)) {
			allFundsTrx = this.accountOtherTrxDao.getAllFundsInOutTrx(accId, startDate);

			if (allFundsTrx != null && !allFundsTrx.isEmpty()) {
				allFundsTrx.forEach(trx -> {
					TrxHistVO trxHistVo = new TrxHistVO();
					trxHistVo.setDateTime((Date) trx[0]);
					trxHistVo.setDesc((String) trx[1]);
					trxHistVo.setType((String) trx[2]);
					trxHistVo.setAmount((Double) trx[3]);

					if (Constants.TRX_TYPE_SPORTS_BET.equals(trx[2])) {
						Date startTime = (Date) trx[4];
						String compType = (String) trx[5];
						String betType = (String) trx[6];

						Boolean isSettled = false;
						if (trx[7] != null && ((Number) trx[7]).intValue() == 1) {
							isSettled = true;
						}

						String trxId = (String) trx[8];
						String betSelection = (String) trx[9];
						Double odds = (Double) trx[10];

						String betDetails = (String) trx[1];
						betDetails = retrieveBetSelectionResult(betDetails, betSelection, odds);

						TrxBetDetailsVO trxBetDetailsVO = new TrxBetDetailsVO();
						trxBetDetailsVO.setStartTime(startTime);
						trxBetDetailsVO.setCompType(compType);
						trxBetDetailsVO.setBetDetails(betDetails);
						trxBetDetailsVO.setBetType(betType);
						trxBetDetailsVO.setStatus(isSettled);
						trxBetDetailsVO.setTrxId(trxId);
						trxHistVo.setTrxBetDetails(trxBetDetailsVO);
					}

					trxHistList.add(trxHistVo);
				});
			}
		} else if (Constants.TRX_TYPE_SPORTS_BET.equals(typeCd)) {
			betTrxView = this.accountBetTrxDao.getByDateRange(accId, startDate);

			if (betTrxView != null && !betTrxView.isEmpty()) {
				betTrxView.forEach(trx -> {
					TrxHistVO trxHistVo = new TrxHistVO();
					trxHistVo.setType(Constants.TRX_TYPE_SPORTS_BET);
					trxHistVo.setDateTime(trx.getTrxDateTime());
					trxHistVo.setDesc(trx.getEventDesc());
					trxHistVo.setAmount(trx.getBetAmount());

					String betDetails = trx.getEventDesc();
					betDetails = retrieveBetSelectionResult(betDetails, trx.getBetSelection(), trx.getOdds());

					TrxBetDetailsVO trxBetDetailsVO = new TrxBetDetailsVO();
					trxBetDetailsVO.setStartTime(trx.getStartTime());
					trxBetDetailsVO.setCompType(trx.getCompType());
					trxBetDetailsVO.setBetDetails(betDetails);
					trxBetDetailsVO.setBetType(trx.getBetType());
					trxBetDetailsVO.setStatus(trx.getSettled());
					trxBetDetailsVO.setTrxId(trx.getTrxId());
					trxHistVo.setTrxBetDetails(trxBetDetailsVO);

					trxHistList.add(trxHistVo);
				});
			}
		} else {
			otherTrxView = this.accountOtherTrxDao.getByTypeByDateRange(accId, typeCd, startDate);

			if (otherTrxView != null && !otherTrxView.isEmpty()) {
				otherTrxView.forEach(trx -> {
					Double amt = trx.getAmount();
					String fullDesc = Constants.TRX_TYPE_DEPOSIT.equals(trx.getType())
							? Constants.DEPOSIT_DESC + Constants.SPACE + Constants.DOLLAR_SIGN
									+ String.format("%.2f", amt)
							: Constants.WITHDRAWAL_DESC + Constants.SPACE + Constants.DOLLAR_SIGN
									+ String.format("%.2f", amt);
					TrxHistVO trxHistVo = new TrxHistVO();
					trxHistVo.setAmount(amt);
					trxHistVo.setType(trx.getType());
					trxHistVo.setDateTime(trx.getTrxDt());
					trxHistVo.setDesc(fullDesc);
					trxHistList.add(trxHistVo);
				});
			}
		}

		return trxHistList;
	}

	private String retrieveBetSelectionResult(String betDetails, String betSelection, Double odds) {
		String[] teams = betDetails.split(" vs ");
		if (teams.length == 2 && Constants.BET_SELECT_HOME.equals(betSelection)) {
			betDetails += Constants.SPACE + Constants.AT_SIGN + Constants.SPACE + teams[0] + Constants.SPACE + odds;
		} else if (teams.length == 2 && Constants.BET_SELECT_DRAW.equals(betSelection)) {
			betDetails += Constants.SPACE + Constants.AT_SIGN + Constants.SPACE + Constants.DRAW + Constants.SPACE
					+ odds;
		} else if (teams.length == 2 && Constants.BET_SELECT_AWAY.equals(betSelection)) {
			betDetails += Constants.SPACE + Constants.AT_SIGN + Constants.SPACE + teams[1] + Constants.SPACE + odds;
		}
		return betDetails;
	}

	public Date genStartDate(String period) {
		Calendar calendar = Calendar.getInstance();
		Date startDate = null;

		switch (period) {
		case Constants.TODAY:
			LocalDate today = LocalDate.now();
			LocalDateTime startOfDay = today.atStartOfDay();
			startDate = Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
			break;
		case Constants.LAST_7_DAY:
			calendar.add(Calendar.DAY_OF_MONTH, -6); // Subtract 6 days to include the last 7 days
			startDate = calendar.getTime();
			break;
		case Constants.LAST_1_MTH:
			calendar.add(Calendar.MONTH, -1);
			startDate = calendar.getTime();
			break;
		case Constants.LAST_3_MTH:
			calendar.add(Calendar.MONTH, -3);
			startDate = calendar.getTime();
			break;
		case Constants.LAST_6_MTH:
			calendar.add(Calendar.MONTH, -6);
			startDate = calendar.getTime();
			break;
		default:
			throw new IllegalArgumentException("Invalid period: " + period);
		}
		return startDate;
	}

	public Map<BigInteger, ResultEventMapping> retrieveCompletedResults() throws Exception {
		List<ResultEventMapping> completedResults = proxy.retrieveCompletedResults();
		Map<BigInteger, ResultEventMapping> resultsMap = new HashMap<>();
		completedResults.forEach(result -> {
			resultsMap.put(result.getEventId(), result);
		});
		return resultsMap;
	}

	public List<AccountBetTrxView> retrieveNotSettledBetTrx() {
		return accountBetTrxDao.findBySettled(Constants.FALSE);
	}

	public void process1X2BetTrxSettlement(AccountBetTrxView betTrx) {
		Long accId = betTrx.getAccId();
		double winAmount = betTrx.getPotentialReturn();

		// insert transaction into bet process trx table
		Long nextSeqTrxId = sequenceService.getNextTrxId();
		AccountBetProcessTrxView accountBetProcessTrxView = new AccountBetProcessTrxView();
		accountBetProcessTrxView
				.setTrxId(Constants.TRX_TYPE_WINNING_CREDIT + Constants.SLASH + accId + Constants.SLASH + nextSeqTrxId);
		accountBetProcessTrxView.setAccId(accId);
		accountBetProcessTrxView.setAmount(winAmount);
		accountBetProcessTrxView.setType(Constants.TRX_TYPE_WINNING_CREDIT);
		accountBetProcessTrxView.setTrxDt(new Date());
		accountBetProcessTrxDao.save(accountBetProcessTrxView);

		// add winning amount and update balance in user account
		AccountView accountView = accountDao.getById(accId);
		double originalBal = accountView.getBalance();
		accountView.setBalance(originalBal + winAmount);
		accountDao.save(accountView);
	}

	public void updateBetTrx(AccountBetTrxView betTrxView) {
		accountBetTrxDao.save(betTrxView);
	}

}
