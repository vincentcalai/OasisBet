import './OddsLanding.css';

import React, { useState } from 'react';
import CompSideNav from './CompSideNav.tsx';
import { Button, Card, Table } from 'react-bootstrap';
import { BetEvent, generateSampleData } from '../constants/MockData.js';
import SharedVarConstants from '../constants/SharedVarConstants.js'; 
import OddsBetSlip from './OddsBetSlip.tsx';
import { useDispatch, useSelector } from 'react-redux';

export default function OddsLanding(){
    const dispatch = useDispatch();
    const betSelections: any = useSelector((state: any) => state.betSlip);
    
    const [compType, setCompType] = useState(SharedVarConstants.API_SOURCE_COMP_TYPE_EPL);
    const [compTypeHdr, setCompTypeHdr] = useState(SharedVarConstants.COMP_HEADER_EPL);
    const [eventsMap, setEventsMap] = useState<Map<string, BetEvent[]>>(generateSampleData());

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
        const newBetEventsMap: any = new Map(eventsMap);

        const betEvents = newBetEventsMap.get(date);
        const betEvent = betEvents[index];

        if (!betEvent) {
            console.error('Invalid index or date');
            return;
        }

        let selectionState = false;

        if (selection === SharedVarConstants.BET_SELECTION_H2H_HOME) {
            selectionState = betEvent.betSelection.homeSelected;
            betEvent.betSelection.homeSelected = !betEvent.betSelection.homeSelected;
        } else if (selection === SharedVarConstants.BET_SELECTION_H2H_DRAW) {
            selectionState = betEvent.betSelection.drawSelected;
            betEvent.betSelection.drawSelected = !betEvent.betSelection.drawSelected;
        } else if (selection === SharedVarConstants.BET_SELECTION_H2H_AWAY) {
            selectionState = betEvent.betSelection.awaySelected;
            betEvent.betSelection.awaySelected = !betEvent.betSelection.awaySelected;
        }
        
        selectionState ? dispatch({type: 'REMOVE_BET_SELECTION'}) : dispatch({type: 'ADD_BET_SELECTION'});

        newBetEventsMap.set(date, betEvents);

        setEventsMap(newBetEventsMap);
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
                            <br></br>
                            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                                <Card.Header className="card-header">
                                    <h2>{compTypeHdr}</h2>
                                </Card.Header>
                                <Card.Body className="card-body">
                                    {eventDates.map((date, index) => (
                                        <div key={index}>
                                            <h3 className="card-subtitle">{formatDate(date)}</h3>
                                            <Table>
                                                <thead>
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
                                                                >
                                                                    <span className={`${event.betSelection.homeSelected ? 'selected' : 'bet-selection-text'}`}>
                                                                        01 | {parseFloat(event.h2hEventOdds.homeOdds).toFixed(2)}
                                                                    </span>
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button type="button" 
                                                                className={`btn ${event.betSelection.drawSelected ? 'selected' : ''}`}
                                                                variant="light"
                                                                onClick={() => selectBetSelection(index, date, SharedVarConstants.BET_SELECTION_H2H_DRAW)}
                                                                >
                                                                    <span className={`${event.betSelection.drawSelected ? 'selected' : 'bet-selection-text'}`}>
                                                                        02 | {parseFloat(event.h2hEventOdds.drawOdds).toFixed(2)}
                                                                    </span>
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button type="button" 
                                                                className={`btn ${event.betSelection.awaySelected ? 'selected' : ''}`}
                                                                variant="light"
                                                                onClick={() => selectBetSelection(index, date, SharedVarConstants.BET_SELECTION_H2H_AWAY)}
                                                                >
                                                                    <span className={`${event.betSelection.awaySelected ? 'selected' : 'bet-selection-text'}`}>
                                                                        03 | {parseFloat(event.h2hEventOdds.awayOdds).toFixed(2)}
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
                        BetSelection: {betSelections}
                        <OddsBetSlip/>
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
