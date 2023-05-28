package com.oasisbet.account.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oasisbet.account.dao.ISequence;
import com.oasisbet.account.view.SequenceView;

@Transactional
@Service
public class SequenceService {

	@Autowired
	private ISequence sequenceDao;

	private final String TRX_SEQUENCE = "trx_sequence";

	public Long getNextTrxId() {

		SequenceView sequenceView = sequenceDao.findById(TRX_SEQUENCE)
				.orElseThrow(() -> new RuntimeException("Transaction Sequence not found"));

		Long currentTrxId = sequenceView.getSeqValue();
		Long nextTrxId = currentTrxId + 1;

		sequenceView.setSeqValue(nextTrxId);
		sequenceDao.save(sequenceView);

		return currentTrxId;
	}
}
