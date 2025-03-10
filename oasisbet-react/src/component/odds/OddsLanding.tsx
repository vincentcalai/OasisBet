import './OddsLanding.css';

import React, { useEffect, useRef, useState } from 'react';
import CompSideNav from '../common/CompSideNav.tsx';
import { Button, Card, Table } from 'react-bootstrap';
import { BetEvent, BetSlip, H2HBetSelection } from '../../constants/Modal.ts';
import SharedVarConstants from '../../constants/SharedVarConstants.ts'; 
import OddsBetSlip from './OddsBetSlip.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOdds } from '../../services/api/ApiService.ts';
import { useNavigate } from 'react-router-dom';
import AlertError from '../util/AlertError.tsx';
import { closeAlert } from '../actions/ReducerAction.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

export default function OddsLanding(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const updatedBetEventsFromKafka = useSelector((state: any) => state.betEvent?.betEvent);
    const [showOddsChangedIcon, setShowOddsChangedIcon] = useState(false);
    const betSlips = useSelector((state: any) => state.betSlip?.betSlip);
    const isUserLoggedIn = useSelector((state: any) => state['login']['isUserLoggedIn']) ;
    const reducerAction = useSelector((state: any) => state.betSlip.action);
    const [compType, setCompType] = useState(SharedVarConstants.API_SOURCE_COMP_TYPE_EPL);
    const [compTypeHdr, setCompTypeHdr] = useState(SharedVarConstants.COMP_HEADER_EPL);
    const [eventsMap, setEventsMap] = useState<Map<string, BetEvent[]>>(new Map());
    const [placeBetStatus, setPlaceBetStatus] = useState('I'); // I -> Init, C -> Confirm, D -> Done
    const selectedBetsRef = useRef([] as BetSlip[]);

    useEffect(() => {
        console.log("OddsLanding updatedBetEvents from DB: ", updatedBetEventsFromKafka)
        console.log("vincent eventsMap before: ", eventsMap)
        eventsMap.forEach((betEvents: BetEvent[], key: string) => {
            betEvents.forEach(event => {
                console.log("vincent event: ", event)
                const isEventFound = updatedBetEventsFromKafka.has(event.eventId)
                console.log("vincent eventFound: ", isEventFound)
                if(isEventFound) {
                    const updatedEventFromMap = updatedBetEventsFromKafka.get(event.eventId)
                    if(event.h2hEventOdds?.homeOdds !== updatedEventFromMap?.homeOdds) {
                        console.log("vincent homeOdds changed! old Odds: ", event.h2hEventOdds?.homeOdds, " new Odds: ", updatedEventFromMap?.homeOdds)
                        const oddsChangeHomeInd = event.h2hEventOdds?.homeOdds < updatedEventFromMap?.homeOdds ? 'GREEN' : 'RED'
                        if(!event.oddsChangeInd) {
                            event.oddsChangeInd = {home: oddsChangeHomeInd} 
                        } else {
                            event.oddsChangeInd.home = oddsChangeHomeInd
                        }
                        event.h2hEventOdds.homeOdds = updatedEventFromMap?.homeOdds
                        handleOddsChangedIcon()
                    } 
                    if(event.h2hEventOdds?.drawOdds !== updatedEventFromMap?.drawOdds) {
                        console.log("vincent drawOdds changed! old Odds: ", event.h2hEventOdds?.drawOdds, " new Odds: ", updatedEventFromMap?.drawOdds)
                        const oddsChangeDrawInd = event.h2hEventOdds?.drawOdds < updatedEventFromMap?.drawOdds ? 'GREEN' : 'RED'
                        if(!event.oddsChangeInd) {
                            event.oddsChangeInd = {draw: oddsChangeDrawInd}
                        } else {
                            event.oddsChangeInd.draw = oddsChangeDrawInd
                        }
                        event.h2hEventOdds.drawOdds = updatedEventFromMap?.drawOdds
                        handleOddsChangedIcon()
                    } 
                    if(event.h2hEventOdds?.awayOdds !== updatedEventFromMap?.awayOdds) {
                        console.log("vincent awayOdds changed! old Odds: ", event.h2hEventOdds?.awayOdds, " new Odds: ", updatedEventFromMap?.awayOdds)
                        const oddsChangeAwayInd = event.h2hEventOdds?.awayOdds < updatedEventFromMap?.awayOdds ? 'GREEN' : 'RED'
                        if(!event.oddsChangeInd) {
                            event.oddsChangeInd = {away: oddsChangeAwayInd}
                        } else {
                            event.oddsChangeInd.away = oddsChangeAwayInd
                        }
                        event.h2hEventOdds.awayOdds = updatedEventFromMap?.awayOdds
                        handleOddsChangedIcon()
                    } 
                }
            })
        })
        console.log("vincent eventsMap after: ", eventsMap)
    }, [updatedBetEventsFromKafka])

    function handleOddsChangedIcon() {
        setShowOddsChangedIcon(true); 
        const homeTimer = setTimeout(() => {
            setShowOddsChangedIcon(false); 
        }, 3000);
        return () => clearTimeout(homeTimer); 
    }

    useEffect(() => {
        const fetchData = async (compType) => {
            try {
                const resp = await fetchOdds(compType);
                
                const betEvents = resp.betEvent;
                console.log("betEvents after retriving odds: ", betEvents);
        
                // Initialize H2HBetSelection object and save to all events
                const updatedEvents = betEvents.map(event => {
                const initBetSelection = new H2HBetSelection();
                event.betSelection = initBetSelection;
                return event;
            });

            // Convert startTime from string to Date format
            updatedEvents.forEach(event => event.startTime = new Date(event.startTime));

            // Record bet selection in current bet slip to match bet selection on screen
            const updatedSelectedBets = selectedBetsRef.current.map(betInBetSlip => {
              const betEvent = updatedEvents.find(event => event.eventId === betInBetSlip.eventId);
              if (betEvent) {
                if (betInBetSlip.betTypeCd === SharedVarConstants.BET_TYPE_CD_H2H && betInBetSlip.betSelection === SharedVarConstants.BET_SELECTION_H2H_HOME) {
                  betEvent.betSelection.homeSelected = true;
                } else if (betInBetSlip.betTypeCd === SharedVarConstants.BET_TYPE_CD_H2H && betInBetSlip.betSelection === SharedVarConstants.BET_SELECTION_H2H_DRAW) {
                  betEvent.betSelection.drawSelected = true;
                } else if (betInBetSlip.betTypeCd === SharedVarConstants.BET_TYPE_CD_H2H && betInBetSlip.betSelection === SharedVarConstants.BET_SELECTION_H2H_AWAY) {
                  betEvent.betSelection.awaySelected = true;
                }
              }
              return betInBetSlip;
            });

            selectedBetsRef.current = updatedSelectedBets;

            // Save unique event dates from all events retrieved
            const uniqueEventDates = Array.from(new Set(updatedEvents.map(event => event.startTime.toDateString())));
    
            // Save into an event map with unique event dates after retrieval of events -> (Date string, BetEvents[])
            const updatedEventsMap = new Map();
            uniqueEventDates.forEach(dateString => {
              const eventsDetails = updatedEvents.filter(event => event.startTime.toDateString() === dateString);
              updatedEventsMap.set(dateString, eventsDetails);
            });
            setEventsMap(updatedEventsMap);
    
            console.log("logging updatedEventsMap: ", updatedEventsMap);
            } catch (error) {
            // Handle error
            console.log("error fetching odds data: ", error);
            }
        };

        fetchData(compType);
    }, [compType]);

    useEffect(() => {
        dispatch(closeAlert());
        console.log("Destroying OddsLanding Component.. EMPTY BET SELECTION")
        dispatch({type: 'EMPTY_BET_SELECTION'});
    }, [dispatch]);

    useEffect(() => {
        if(!betSlips || betSlips.length === 0){
            setPlaceBetStatus('I');
        }
        selectedBetsRef.current = betSlips;
    }, [betSlips]);

    useEffect(() => {
        if(reducerAction === 'CLEAR'){
            selectedBetsRef.current = [];
            setEventsMap((eventsMap) => {
                eventsMap.forEach((events) => {
                    events.forEach((betEvent) => {
                        betEvent.betSelection.homeSelected = false;
                        betEvent.betSelection.drawSelected = false;
                        betEvent.betSelection.awaySelected = false;
                    });
                });
                return new Map(eventsMap);
            });
        }
    }, [reducerAction]);

    const selectCompType = (newCompType) => {
        setCompTypeHdr(retrieveCompHdr(SharedVarConstants, newCompType));
        setCompType(newCompType);
    };

    console.log("eventsMap: ", eventsMap);
    const eventDates = eventsMap ? Array.from(eventsMap.keys()) : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    function selectBetSelection(index: number, date: any, selection: string) {
        if(!isUserLoggedIn){
            navigate('/account', { state: { code: 1, message: SharedVarConstants.USER_NOT_LOGGED_IN } });
            return;
        }

        const newBetEventsMap: any = new Map(eventsMap);

        const betEvents = newBetEventsMap.get(date);
        const betEvent = betEvents[index];

        if (!betEvent) {
            console.error('Invalid index or date');
            return;
        }

        let isRemoveBetSelection = false;
        let selectedTeam = "";
        let odds: number = 0;

        if (selection === SharedVarConstants.BET_SELECTION_H2H_HOME) {
            isRemoveBetSelection = betEvent.betSelection.homeSelected;
            betEvent.betSelection.homeSelected = !betEvent.betSelection.homeSelected;
            odds = betEvent.h2hEventOdds.homeOdds;
            selectedTeam = betEvent.teamsDetails.homeTeam;
        } else if (selection === SharedVarConstants.BET_SELECTION_H2H_DRAW) {
            isRemoveBetSelection = betEvent.betSelection.drawSelected;
            betEvent.betSelection.drawSelected = !betEvent.betSelection.drawSelected;
            odds = betEvent.h2hEventOdds.drawOdds;
            selectedTeam = SharedVarConstants.DRAW_RESULT;
        } else if (selection === SharedVarConstants.BET_SELECTION_H2H_AWAY) {
            isRemoveBetSelection = betEvent.betSelection.awaySelected;
            betEvent.betSelection.awaySelected = !betEvent.betSelection.awaySelected;
            odds = betEvent.h2hEventOdds.awayOdds;
            selectedTeam = betEvent.teamsDetails.awayTeam;
        }

        let betSlip = new BetSlip();
        betSlip.eventId = betEvent.eventId;
        betSlip.eventDesc = betEvent.eventDesc;
        betSlip.betTypeCd = SharedVarConstants.BET_TYPE_CD_H2H;
        betSlip.betSelection = selection;
        betSlip.betSelectionName = selectedTeam;
        betSlip.odds = odds;
        betSlip.startTime = betEvent.startTime;
        betSlip.compType = betEvent.compType;

        if (!isRemoveBetSelection) {
            selectedBetsRef.current.push(betSlip);
            selectedBetsRef.current = [...selectedBetsRef.current];
            dispatch({ type: 'ADD_BET_SELECTION', payload: selectedBetsRef.current });
        } else {
            selectedBetsRef.current = selectedBetsRef.current.filter(e => !(e.eventId === betSlip.eventId && e.betSelection === betSlip.betSelection));
            dispatch({ type: 'REMOVE_BET_SELECTION', payload: selectedBetsRef.current });
        }
        
        setPlaceBetStatus("I");
        newBetEventsMap.set(date, betEvents);
        setEventsMap(newBetEventsMap);
    }

    function handleBetSlipUpdate(deletedBetEvent){
        eventsMap.forEach(events => {
            const updatedEvent = events.find(event => event.eventId === deletedBetEvent.eventId) 
            const deletedBetEventSelection = deletedBetEvent.betSelection;
            if(updatedEvent && (deletedBetEventSelection === SharedVarConstants.BET_SELECTION_H2H_HOME)){
                updatedEvent.betSelection.homeSelected = !updatedEvent.betSelection.homeSelected;
            } else if(updatedEvent && (deletedBetEventSelection === SharedVarConstants.BET_SELECTION_H2H_DRAW)){
                updatedEvent.betSelection.drawSelected= !updatedEvent.betSelection.drawSelected;
            } else if(updatedEvent && (deletedBetEventSelection === SharedVarConstants.BET_SELECTION_H2H_AWAY)){
                updatedEvent.betSelection.awaySelected = !updatedEvent.betSelection.awaySelected;
            }
        })
        setEventsMap(new Map(eventsMap));
    }

    function handlePlaceBetStatusUpdate(status){
        setPlaceBetStatus(status);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <CompSideNav compType={compType} selectCompType={selectCompType}></CompSideNav>
                    </div>
                    <div className="col-8">
                        <div className="container-fluid">
                            <br />
                            <AlertError></AlertError>
                            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                                <Card.Header className="card-header">
                                    <h2>{compTypeHdr}</h2>
                                </Card.Header>
                                <Card.Body className="card-body">
                                    <br />
                                    {eventDates.map((date, index) => (
                                        <div key={index}>
                                            <h3 className="card-subtitle">{formatDate(date)}</h3>
                                            <br />
                                            <Table>
                                                <thead className="table-primary table-header">
                                                    <tr>
                                                        <th style={{ width: '13%' }}>Time</th>
                                                        <th style={{ width: '12%' }}>Event ID</th>
                                                        <th style={{ width: '36%' }}>Event Description</th>
                                                        <th style={{ width: '13%' }}>Home (1)</th>
                                                        <th style={{ width: '13%' }}>Draw (X)</th>
                                                        <th style={{ width: '13%' }}>Away (2)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {eventsMap?.get(date)?.map((event, index) => (
                                                        <tr key={index}>
                                                            <td>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                            <td>{event.eventId}</td>
                                                            <td>{event.eventDesc}</td>
                                                            <td>
                                                                <Button type="button" 
                                                                className={`btn ${event.betSelection.homeSelected ? 'selected' : ''}`}
                                                                variant="light"
                                                                onClick={() => selectBetSelection(index, date, SharedVarConstants.BET_SELECTION_H2H_HOME)}
                                                                disabled={placeBetStatus === 'C'}
                                                                aria-label="Home Select">
                                                                    <span className={`${event.betSelection.homeSelected ? 'selected' : 'bet-selection-text'}`}>
                                                                        01 | {parseFloat(event.h2hEventOdds.homeOdds).toFixed(2)}
                                                                        {showOddsChangedIcon && event.oddsChangeInd?.home === 'GREEN' &&
                                                                        <FontAwesomeIcon 
                                                                            icon={faAngleDoubleUp} 
                                                                            className='odds-change-up-icon'
                                                                        /> }
                                                                        {showOddsChangedIcon && event.oddsChangeInd?.home === 'RED' &&
                                                                        <FontAwesomeIcon 
                                                                            icon={faAngleDoubleDown} 
                                                                            className='odds-change-down-icon'
                                                                        />
                                                                        }
                                                                    </span>
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button type="button" 
                                                                className={`btn ${event.betSelection.drawSelected ? 'selected' : ''}`}
                                                                variant="light"
                                                                onClick={() => selectBetSelection(index, date, SharedVarConstants.BET_SELECTION_H2H_DRAW)}
                                                                disabled={placeBetStatus === 'C'}
                                                                aria-label="Draw Select">
                                                                    <span className={`${event.betSelection.drawSelected ? 'selected' : 'bet-selection-text'}`}>
                                                                        02 | {parseFloat(event.h2hEventOdds.drawOdds).toFixed(2)}
                                                                        {showOddsChangedIcon && event.oddsChangeInd?.draw === 'GREEN' &&
                                                                        <FontAwesomeIcon 
                                                                            icon={faAngleDoubleUp} 
                                                                            className='odds-change-up-icon'
                                                                        /> }
                                                                        {showOddsChangedIcon && event.oddsChangeInd?.draw === 'RED' &&
                                                                        <FontAwesomeIcon 
                                                                            icon={faAngleDoubleDown} 
                                                                            className='odds-change-down-icon'
                                                                        />
                                                                        }
                                                                    </span>
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button type="button" 
                                                                className={`btn ${event.betSelection.awaySelected ? 'selected' : ''}`}
                                                                variant="light"
                                                                onClick={() => selectBetSelection(index, date, SharedVarConstants.BET_SELECTION_H2H_AWAY)}
                                                                disabled={placeBetStatus === 'C'}
                                                                aria-label="Away Select">
                                                                    <span className={`${event.betSelection.awaySelected ? 'selected' : 'bet-selection-text'}`}>
                                                                        03 | {parseFloat(event.h2hEventOdds.awayOdds).toFixed(2)}
                                                                        {showOddsChangedIcon && event.oddsChangeInd?.away === 'GREEN' &&
                                                                        <FontAwesomeIcon 
                                                                            icon={faAngleDoubleUp} 
                                                                            className='odds-change-up-icon'
                                                                        /> }
                                                                        {showOddsChangedIcon && event.oddsChangeInd?.away === 'RED' &&
                                                                        <FontAwesomeIcon 
                                                                            icon={faAngleDoubleDown} 
                                                                            className='odds-change-down-icon'
                                                                        />
                                                                        }
                                                                    </span>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    ))}
                                    {
                                        (!eventsMap || eventsMap.size === 0) &&
                                        <div className="container-fluid text-center">
                                            <span>No Event(s) Found.</span>
                                        </div>
                                    }
                                </Card.Body>
                                
                            </Card>
                            
                        </div>
                    </div>
                    <div className="col-2">
                        <OddsBetSlip onBetSlipUpdate={handleBetSlipUpdate} onPlaceBetStatusUpdate={handlePlaceBetStatusUpdate} placeBetStatus={placeBetStatus}/>
                    </div>
                </div>
            </div>
        </>
    );
}

function retrieveCompHdr(sharedVar, newCompType): string {
    switch(newCompType) { 
        case sharedVar.API_SOURCE_COMP_TYPE_EPL: { 
            return sharedVar.COMP_HEADER_EPL; 
        } 
        case sharedVar.API_SOURCE_COMP_TYPE_LALIGA: { 
            return sharedVar.COMP_HEADER_LALIGA; 
        } 
        case sharedVar.API_SOURCE_COMP_TYPE_BUNDESLIGA: {
            return sharedVar.COMP_HEADER_BUNDESLIGA; 
        }
        case sharedVar.API_SOURCE_COMP_TYPE_SERIE_A: {
            return sharedVar.COMP_HEADER_SERIE_A; 
        }
        case sharedVar.API_SOURCE_COMP_TYPE_LIGUE_ONE: {
            return sharedVar.COMP_HEADER_LIGUE_ONE; 
        }
        case sharedVar.API_SOURCE_COMP_TYPE_FA_CUP: {
            return sharedVar.COMP_HEADER_FA_CUP; 
        }
        case sharedVar.API_SOURCE_COMP_TYPE_EFL_CUP: {
            return sharedVar.COMP_HEADER_EFL_CUP; 
        }
        case sharedVar.API_SOURCE_COMP_TYPE_UCL: {
            return sharedVar.COMP_HEADER_UCL; 
        }
        default: {
            return '';
        }
    }
}
