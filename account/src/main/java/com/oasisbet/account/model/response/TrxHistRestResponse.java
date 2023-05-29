package com.oasisbet.account.model.response;

import java.util.List;

import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.TrxHistVO;

public class TrxHistRestResponse extends StatusResponse {
	private List<TrxHistVO> trxHistList;

	public List<TrxHistVO> getTrxHistList() {
		return trxHistList;
	}

	public void setTrxHistList(List<TrxHistVO> trxHistList) {
		this.trxHistList = trxHistList;
	}
}
