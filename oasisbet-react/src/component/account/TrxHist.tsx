import React, { useEffect, useState } from "react";
import './TrxHist.css';
import { Card, Table } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import SharedVarMethods from "../../constants/SharedVarMethods.ts";
import { useSessionStorage } from "../util/useSessionStorage.ts";
import { retrieveMtdAmounts, retrieveTrxList } from "../../services/api/ApiService.ts";
import { TrxHistModel } from "../../model/TrxHistModel.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function TrxHist(){

    const [trxHistList, setTrxHistList] = useState([] as TrxHistModel[])

    const [accountDetails, setAccountDetails] = useSessionStorage(SharedVarConstants.ACCOUNT_DETAILS, {});
    const [mtdBetAmount, setMtdBetAmount] = useState('0.00');
    const [mtdPayout, setMtdPayout] = useState('0.00');
    const [selectedTrxType, setSelectedTrxType] = useState('funds');
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        console.log("accountDetails in Transaction History: ", accountDetails);
        const { accId } = accountDetails || {};

        retrieveAccDetails(accId);

        setAccountDetails(accountDetails);
    }, [accountDetails, setAccountDetails]);

    useEffect(() => {
        const { accId } = accountDetails || {};
        console.log("selectedTrxType: ", selectedTrxType, " selectedPeriod: ", selectedPeriod);
        retrieveTrx(accId, selectedTrxType, selectedPeriod);   
    }, [selectedTrxType, selectedPeriod, accountDetails]);

    const retrieveAccDetails = async (accId: string) => {
        try {
            const response: any = await retrieveMtdAmounts(accId);
            const mtdBetAmount = response.account.mtdBetAmount;
            const mtdPayout = response.account.mthPayout;
            setMtdBetAmount(mtdBetAmount != null ? mtdBetAmount.toFixed(2).toString() : '0.00');
            setMtdPayout(mtdPayout != null ? mtdPayout.toFixed(2).toString() : '0.00');
        } catch (error) {
            //TODO to change this error message to a generic error message shown as red banner
            console.error("Error in retrieve MTD amount details:", error);
            setErrorMsg("Error in retrieving MTD amount Details. Please try again.");
        }
    } 

    const retrieveTrx = async (accId: string, selectedTrxType: string, selectedPeriod: string) => {
        try {
            const response: any = await retrieveTrxList(accId, selectedTrxType, selectedPeriod);
            const trxHist = response.trxHistList;
            setTrxHistList(trxHist);
        } catch (error) {
            //TODO to change this error message to a generic error message shown as red banner
            console.error("Error in retrieve Transaction History details:", error);
            setErrorMsg("Error in retrieving Transaction History Details. Please try again.");
        }
    } 

    const toggleShowDetails = (index) => {
        setTrxHistList((prevTrxHistList) =>
            prevTrxHistList.map((trx, i) =>
                i === index ? { ...trx, showDetails: !trx.showDetails } : trx
            )
        );
    };

    return (
        <div className="container-fluid">
            <br />
            {errorMsg && <div className="alert alert-danger col-md-6 offset-md-3"><b>Fail: </b>{errorMsg}</div>}
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Transaction History</h2>
                </Card.Header>
                <Card.Body className="card-body">
                <div>
                    <label className="trx-section-label-width">Month To Date</label>
                    <br />
                    <label className="trx-section-label-width">Bet Placed:</label>
                    <span className="col-sm-3 trx-section-selection-width">${mtdBetAmount}</span>
                    <br />
                    <label className="trx-section-label-width">Payout:</label>
                    <span className="col-sm-3 trx-section-selection-width">${mtdPayout}</span>
                    <hr />
                    <div className="row">
                        <div className="col-md-3 offset-md-1">
                        <label className="trx-section-label-width">View</label>
                        <div className="dropdown-section">
                            <select id="trxViewDropdown" className="trx-dropdown"
                                value={selectedTrxType} onChange={(e) => setSelectedTrxType(e.target.value)}>
                                <option value="funds">Funds In/Out</option>
                                <option value="sportsbet">All Sports Bet</option>
                                <option value="deposit">Deposits</option>
                                <option value="withdrawal">Withdrawals</option>
                            </select>
                        </div>
                        </div>
                        <div className="col-md-3 offset-md-1">
                        <label className="trx-section-label-width">Time Period</label>
                        <div className="dropdown-section">
                            <select id="trxTimePrdDropdown" className="trx-dropdown"
                                value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                                <option value="today">Today</option>
                                <option value="last7day">Last 7 Days</option>
                                <option value="last1mth">Last Month</option>
                                <option value="last3mth">Last 3 Months</option>
                                <option value="last6mth">Last 6 Months</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    <br />
                    <Table className="table">
                        <thead className="table-primary">
                        <tr>
                            <th style={{ textAlign: 'center', width: '25%' }}>Date & Time</th>
                            <th style={{ textAlign: 'center', width: '45%' }}>Description</th>
                            <th style={{ textAlign: 'center', width: '20%' }}>Amount</th>
                            <th style={{ textAlign: 'center', width: '10%' }}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {trxHistList.map((trx, index) => (
                            <React.Fragment key={index}>
                            <tr>
                                <td style={{ textAlign: 'center', width: '25%' }}>
                                    {new Date(trx.dateTime).toLocaleString()}
                                </td>
                                <td style={{ textAlign: 'center', width: '45%' }}>
                                    {trx.desc}
                                </td>
                                <td style={{ textAlign: 'center', width: '20%' }}>
                                    {trx.type === 'W' || trx.type === 'S' ? `-$${trx.amount.toFixed(2)}` : `+$${trx.amount.toFixed(2)}`}
                                </td>
                                <td style={{ textAlign: 'center', width: '10%' }}>
                                    {(trx.type === 'S' || trx.type === 'C') && (
                                    <FontAwesomeIcon
                                        icon={trx.showDetails ? faAngleDown : faAngleRight}
                                        onClick={() => toggleShowDetails(index)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    )}
                                </td>
                            </tr>
                            {trx.showDetails && trx.trxBetDetails && (
                                <tr>
                                <td colSpan={4}>
                                    <Table bordered hover>
                                    <thead className="table-secondary">
                                        <tr>
                                        <th style={{ textAlign: 'center', width: '20%' }}>Start Time</th>
                                        <th style={{ textAlign: 'center', width: '15%' }}>Competition</th>
                                        <th style={{ textAlign: 'center', width: '25%' }}>Bet Details</th>
                                        <th style={{ textAlign: 'center', width: '10%' }}>Bet Type</th>
                                        <th style={{ textAlign: 'center', width: '10%' }}>Status</th>
                                        <th style={{ textAlign: 'center', width: '20%' }}>Bet Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td style={{ textAlign: 'center', width: '20%' }}>{new Date(trx.trxBetDetails.startTime).toLocaleString()}</td>
                                        <td style={{ textAlign: 'center', width: '15%' }}>{trx.trxBetDetails.compType}</td>
                                        <td style={{ textAlign: 'center', width: '25%' }}>{trx.trxBetDetails.betDetails}</td>
                                        <td style={{ textAlign: 'center', width: '10%' }}>{SharedVarMethods.mapBetTypeCd(trx.trxBetDetails.betType)}</td>
                                        <td style={{ textAlign: 'center', width: '10%' }}>{trx.trxBetDetails.status ? SharedVarConstants.SETTLED : SharedVarConstants.NOT_SETTLED}</td>
                                        <td style={{ textAlign: 'center', width: '20%' }}>{trx.trxBetDetails.trxId}</td>
                                        </tr>
                                    </tbody>
                                    </Table>
                                </td>
                                </tr>
                            )}
                            </React.Fragment>
                        ))}
                        {(!trxHistList || trxHistList.length === 0) && (
                            <tr>
                            <td className="text-center" colSpan={6}>
                                No Transaction(s) Found.
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </div>
                </Card.Body> 
            </Card>
        </div>
    );
}