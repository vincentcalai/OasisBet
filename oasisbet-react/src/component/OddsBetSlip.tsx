import React, { useEffect, useState } from "react";
import './OddsBetSlip.css';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export default function OddsBetSlip(){
    const betEvents = useSelector((state: any) => state.betSlip);
    const [showSingles, setShowSingles] = useState(true);

    useEffect(() => {
        console.log("betEvent: ", betEvents);
    }, [betEvents]);

    function handleClick(event): void {
        console.log("handleClick works!");
        setShowSingles(prevState => !prevState);
    }

    return (
        betEvents.length > 0 && 
        <div className="bet-slip">
            <h2 className="bet-slip-header">Bet Slip</h2>
            <div className="header-panel">
                <h3 className="panel-header" onClick={handleClick}>Singles
                    <span className="dropdown-icon">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </h3>
                <br />
                {showSingles && 
                    <div className="selections">
                        <div className="bet-slip-container">
                            <div className="container">
                                {betEvents.map(betEvent => {
                                    return (
                                        <div key={betEvent.eventId + '_' + betEvent.betSelection}>
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <p className="event-description">{betEvent.eventDesc}</p>
                                                </div>
                                                <div className="col-md-2">
                                                    <p className="delete-icon">&#10005;</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <p className="bet-type">1X2</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <p className="bet-selection">{betEvent.betSelectionName} @ {betEvent.odds}</p>
                                                </div>    
                                                <div className="col-md-4">
                                                    <span className="bet-amount-input">
                                                        $<input type="text" maxLength={7} inputMode="numeric" />
                                                    </span>
                                                </div>    
                                            </div>
                                        </div>
                                    )
                                })}
                                <hr />
                                <div className="row">
                                    <p className="potential-payout-text">Potential Payout: $10.06</p>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </div>
                }

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