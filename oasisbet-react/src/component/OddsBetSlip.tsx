import React from "react";
import './OddsBetSlip.css';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function OddsBetSlip(){
    const betSelectionCount: any = useSelector((state: any) => state.selectionCount);
    console.log("in OddsBetSlip component betSelectionSelector: ", betSelectionCount);

    return (
        betSelectionCount > 0 && <div className="bet-slip">
            <h2 className="bet-slip-header">Bet Slip</h2>
            <div className="header-panel">
                <h3 className="panel-header">Singles
                    <span className="dropdown-icon">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </h3>
                <br />
                <div className="selections">
                    <div className="bet-slip-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9">
                                    <p className="event-description">Chelsea vs Manchester United</p>
                                    <p className="bet-type">1X2</p>
                                    <p className="bet-selection">Chelsea @ 2.03</p>
                                </div>
                                <div className="col-md-3">
                                    <p className="delete-icon">&#10005;</p>
                                    <span className="bet-amount-input">
                                        $<input type="text" maxLength={7} inputMode="numeric"/>
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <p className="potential-payout-text">Potential Payout: $10.06</p>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
                <div className="total-stake-panel">
                    <span className="total-stake-section">Total Stake: $2</span>
                </div>
                <button className="btn btn-success btn-place-bet" type="button">
                    Place Bet
                </button>
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center">
                        <button className="btn btn-success btn-decline" type="button">
                            Decline
                        </button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <button className="btn btn-success btn-confirm" type="button">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}