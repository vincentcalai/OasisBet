import React from "react";
import './TrxHist.css';
import { Card } from "react-bootstrap";
import SharedVarConstants from "../../constants/SharedVarConstants.js";
import SharedVarMethods from "../../constants/SharedVarMethods.js";

export default function TrxHist(){

    const trxHistList: any = [];

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
                    <span className="col-sm-3 trx-section-selection-width">$5568.10</span>
                    <br />
                    <label className="trx-section-label-width">Payout:</label>
                    <span className="col-sm-3 trx-section-selection-width">$6421.42</span>
                    <hr />
                    <div className="row">
                        <div className="col-md-3 offset-md-1">
                        <label className="trx-section-label-width">View</label>
                        <div className="dropdown-section">
                            <select id="trxViewDropdown" className="trx-dropdown">
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
                            <select id="trxTimePrdDropdown" className="trx-dropdown">
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
                    <table className="table" style={{ tableLayout: 'fixed', width: '100%' }}>
                        <thead className="table-header-trx">
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
                                </td>
                            </tr>
                            {trx.showDetails && trx.trxBetDetails && (
                                <tr>
                                <td colSpan={4}>
                                    <table className="table" style={{ tableLayout: 'fixed', width: '100%' }}>
                                    <thead className="table-header-details">
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
                                    </table>
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
                    </table>
                    </div>
                </Card.Body> 
            </Card>
        </div>
    );
}