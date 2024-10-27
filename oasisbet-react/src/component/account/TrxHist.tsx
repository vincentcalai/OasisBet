import React, { useEffect, useState } from "react";
import './TrxHist.css';
import { Card, Table } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import SharedVarMethods from "../../constants/SharedVarMethods.ts";
import { retrieveMtdAmounts, retrieveTrxList } from "../../services/api/ApiService.ts";
import { TrxHistModel } from "../../model/TrxHistModel.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { handleJwtTokenExpireError } from "../../services/AuthService.ts";
import { updateLoginDetails } from "../actions/ReducerAction.ts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeAlert, openAlert } from "../actions/ReducerAction.ts";

export default function TrxHist(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [trxHistList, setTrxHistList] = useState([] as TrxHistModel[])

    const accountDetails = useSelector((state: any) => state['account']['accountDetails']) ;
    const [mtdBetAmount, setMtdBetAmount] = useState('0.00');
    const [mtdPayout, setMtdPayout] = useState('0.00');
    const [selectedTrxType, setSelectedTrxType] = useState('funds');
    const [selectedPeriod, setSelectedPeriod] = useState('today');

    useEffect(() => {
        dispatch(closeAlert());
        console.log("accountDetails in Transaction History: ", accountDetails);
        const { accId } = accountDetails || {};

        const retrieveAccDetails = async (accId: string) => {
            try {
                await callApiRetrieveAccDetails(accId);
            } catch (error) {
                //Try refresh JWT token if token expired
                try {
                  const response = await handleJwtTokenExpireError(error, async () => await callApiRetrieveAccDetails(accId))
                  if(response){
                    console.log("General Error: ", error);
                    dispatch(openAlert(error.message));
                  }   
                } catch (error) {
                  console.log("Error when withdrawing after refresh token: ", error);
                  SharedVarMethods.clearSessionStorage();
                  dispatch(updateLoginDetails('isUserLoggedIn', false));
                  navigate('/account', { state: { code: 1, message: SharedVarConstants.UNAUTHORIZED_ERR_MSG } });
                }
            }
        } 

        retrieveAccDetails(accId);
    }, [accountDetails, dispatch, navigate]);

    useEffect(() => {
        const { accId } = accountDetails || {};
        console.log("selectedTrxType: ", selectedTrxType, " selectedPeriod: ", selectedPeriod);

        const retrieveTrx = async (accId: string, selectedTrxType: string, selectedPeriod: string) => {
            try {
                await callApiRetrieveTrx(accId, selectedTrxType, selectedPeriod);
            } catch (error) {
                //Try refresh JWT token if token expired
                try {
                  const response = await handleJwtTokenExpireError(error, async () => await callApiRetrieveTrx(accId, selectedTrxType, selectedPeriod))
                  if(response){
                    console.log("General Error: ", error);
                    dispatch(openAlert(error.message));
                  }
                } catch (error) {
                  console.log("Error when retriving transactions after refresh token: ", error);
                  SharedVarMethods.clearSessionStorage();
                  dispatch(updateLoginDetails('isUserLoggedIn', false));
                  navigate('/account', { state: { code: 1, message: SharedVarConstants.UNAUTHORIZED_ERR_MSG } });
                }
            }
        } 

        retrieveTrx(accId, selectedTrxType, selectedPeriod);   
    }, [selectedTrxType, selectedPeriod, accountDetails, dispatch, navigate]);

    const toggleShowDetails = (index) => {
        setTrxHistList((prevTrxHistList) =>
            prevTrxHistList.map((trx, i) =>
                i === index ? { ...trx, showDetails: !trx.showDetails } : trx
            )
        );
    };

    async function callApiRetrieveAccDetails(accId: string) {
        try {
            const response: any = await retrieveMtdAmounts(accId);
            const mtdBetAmount = response.account.mtdBetAmount;
            const mtdPayout = response.account.mthPayout;
            setMtdBetAmount(mtdBetAmount != null ? mtdBetAmount.toFixed(2).toString() : '0.00');
            setMtdPayout(mtdPayout != null ? mtdPayout.toFixed(2).toString() : '0.00');
        } catch (error) {
            throw error;
        }
    }

    async function callApiRetrieveTrx(accId: string, selectedTrxType: string, selectedPeriod: string) {
        try {
            const response: any = await retrieveTrxList(accId, selectedTrxType, selectedPeriod);
            const trxHist = response.trxHistList;
            setTrxHistList(trxHist);
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="container-fluid">
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Transaction History</h2>
                </Card.Header>
                <Card.Body className="card-body">
                <div>
                    <label className="trx-section-label-width">Month To Date</label>
                    <br />
                    <label className="trx-section-label-width">Bet Placed:</label>
                    <span className="col-sm-3 trx-section-selection-width" aria-label="Bet Placed">${mtdBetAmount}</span>
                    <br />
                    <label className="trx-section-label-width">Payout:</label>
                    <span className="col-sm-3 trx-section-selection-width" aria-label="Payout">${mtdPayout}</span>
                    <hr />
                    <div className="row">
                        <div className="col-md-3 offset-md-1">
                        <label className="trx-section-label-width" htmlFor="trxViewDropdown">View</label>
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
                        <label className="trx-section-label-width" htmlFor="trxTimePrdDropdown">Time Period</label>
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
                                        aria-label="Show Trx Details"
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