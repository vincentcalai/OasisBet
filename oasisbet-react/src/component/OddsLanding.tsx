import './OddsLanding.css';

import { useState } from 'react';
import CompSideNav from './CompSideNav.tsx';
import { Button, Card, Table } from 'react-bootstrap';
import React from 'react';
import { generateSampleData } from '../constants/MockData.js';

export default function OddsLanding({sharedVar}){
    
    const [compType, setCompType] = useState(sharedVar.API_SOURCE_COMP_TYPE_EPL);
    const [compTypeHdr, setCompTypeHdr] = useState(sharedVar.COMP_HEADER_EPL);

    const selectCompType = (newCompType) => {
        setCompTypeHdr(retrieveCompHdr(sharedVar, newCompType));
        setCompType(newCompType);
    };

    const eventsMap = generateSampleData();
    console.log("eventsMap: ", eventsMap)

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <CompSideNav compType={compType} sharedVar={sharedVar} selectCompType={selectCompType}></CompSideNav>
                    </div>
                    <div className="col-8">
                        <div className="container-fluid">
                            <br></br>
                            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                                <Card.Header className="card-header">
                                    <h2>{compTypeHdr}</h2>
                                </Card.Header>
                                <Card.Body className="card-body">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th style={{width: '13%'}}>Time</th>
                                                <th style={{width: '12%'}}>Event ID</th>
                                                <th style={{width: '36%'}}>Event Description</th>
                                                <th style={{width: '13%'}}>Home (1)</th>
                                                <th style={{width: '13%'}}>Draw (X)</th>
                                                <th style={{width: '13%'}}>Away (2)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventsMap.get('2024-04-06').map((event, index) => (
                                                <tr key={index}>
                                                    <td>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                    <td>{event.eventId}</td>
                                                    <td>{event.eventDesc}</td>
                                                    <td>
                                                        <Button type="button" className="btn" variant="light">
                                                            <span className="bet-selection-text">
                                                                01 | {parseFloat(event.h2hEventOdds.homeOdds).toFixed(2)}
                                                            </span>
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button type="button" className="btn" variant="light">
                                                            <span className="bet-selection-text">
                                                                02 | {parseFloat(event.h2hEventOdds.drawOdds).toFixed(2)}
                                                            </span>
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button type="button" className="btn" variant="light">
                                                            <span className="bet-selection-text">
                                                                03 | {parseFloat(event.h2hEventOdds.awayOdds).toFixed(2)}
                                                            </span>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="col-2">
                        <p>Betting Slip</p>
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
