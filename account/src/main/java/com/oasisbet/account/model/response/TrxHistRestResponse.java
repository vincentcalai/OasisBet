package com.oasisbet.account.model.response;

import java.util.List;

import com.oasisbet.account.model.StatusResponse;
import com.oasisbet.account.model.TrxHistVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrxHistRestResponse extends StatusResponse {
	private List<TrxHistVO> trxHistList;
}
