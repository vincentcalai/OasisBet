package com.oasisbet.account.util;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.beans.factory.annotation.Autowired;

import com.oasisbet.account.dao.ISequence;
import com.oasisbet.account.view.SequenceView;

public class TrxIdGenerator implements IdentifierGenerator {

	@Autowired
	private ISequence sequenceDao;

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		String seqName = "trx_sequence";
		SequenceView trxSequence = sequenceDao.findBySeqName(seqName);

		if (trxSequence == null) {
			trxSequence = new SequenceView();
			trxSequence.setSeqName(seqName);
			trxSequence.setSeqValue(100000L);
		} else {
			trxSequence.setSeqValue(trxSequence.getSeqValue() + 1);
		}

		trxSequence = sequenceDao.save(trxSequence);
		return trxSequence.getSeqValue();
	}
}