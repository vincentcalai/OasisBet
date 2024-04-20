import React, { useEffect, useState } from "react";
import './OddsBetSlip.css';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

export default function OddsBetSlip({onBetSlipUpdate}){
    const dispatch = useDispatch();

    const betEvents = useSelector((state: any) => state.betSlip);
    const [betSlipSelections, setBetSlipSelections] = useState([]) as any;
    const [showSingles, setShowSingles] = useState(true);
    const [totalStake, setTotalStake] = useState(0);

    useEffect(() => {
        setBetSlipSelections(betEvents);
    }, [betEvents]);

    function handleClickSingles(event): void {
        setShowSingles(prevState => !prevState);
    }

    function handleOnDelete(betEvent): void {
        let updateBetEvents = [...betSlipSelections];
        updateBetEvents = updateBetEvents.filter(e => !(e.eventId === betEvent.eventId && e.betSelection === betEvent.betSelection));
        setBetSlipSelections(updateBetEvents);
        onBetSlipUpdate(betEvent);
        dispatch({type: 'REMOVE_BET_SELECTION', payload: updateBetEvents});
    }

    function handleChangeBetAmount(betEvent, event){
        const amount = +event.target.value;
        betEvent.betAmount = amount;
        const odds = +betEvent.odds;
        betEvent.potentialPayout = +(odds * amount).toFixed(2);
        let updatedTotalStake = 0;
        const updatedBetSlip = betSlipSelections.map(betSelection => {
            updatedTotalStake += betSelection.betAmount;
            if(betSelection.eventId === betEvent.eventId){
                return betEvent;
            }
            return betSelection;
        });
        setBetSlipSelections(updatedBetSlip);
        setTotalStake(updatedTotalStake);
    }

    return (
        betSlipSelections.length > 0 && 
        <div className="bet-slip">
            <h2 className="bet-slip-header">Bet Slip</h2>
            <div className="header-panel">
                <h3 className="panel-header" onClick={handleClickSingles}>Singles
                    <span className="dropdown-icon">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </h3>
                <br />
                {showSingles && 
                    <div className="selections">
                        <div className="bet-slip-container">
                            <div className="container">
                                {betSlipSelections.map(betEvent => {
                                    return (
                                        <div key={betEvent.eventId + '_' + betEvent.betSelection}>
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <p className="event-description">{betEvent.eventDesc}</p>
                                                </div>
                                                <div className="col-md-2" onClick={() => handleOnDelete(betEvent)}>
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
                                                        $<input type="text" maxLength={7} inputMode="numeric" onChange={(event) => handleChangeBetAmount(betEvent, event)}/>
                                                    </span>
                                                </div>    
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <p className="potential-payout-text">Potential Payout: ${betEvent.potentialPayout.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                
                            </div>
                            <br/>
                        </div>
                    </div>
                }

                <div className="total-stake-panel">
                    <span className="total-stake-section">Total Stake: ${totalStake}</span>
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