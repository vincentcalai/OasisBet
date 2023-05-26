package com.oasisbet.account.view;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_sequence")
public class SequenceView {
	@Id
	@Column(name = "seq_name")
	private String seqName;

	@Column(name = "seq_value")
	private Long seqValue;

	public String getSeqName() {
		return seqName;
	}

	public void setSeqName(String seqName) {
		this.seqName = seqName;
	}

	public Long getSeqValue() {
		return seqValue;
	}

	public void setSeqValue(Long seqValue) {
		this.seqValue = seqValue;
	}

}
