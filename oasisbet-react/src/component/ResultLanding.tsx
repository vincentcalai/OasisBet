import React, { useState } from "react";
import './ResultLanding.css';
import SharedVarConstants from "../constants/SharedVarConstants";
import CompSideNav from './CompSideNav.tsx';
import { Button, Card, Table } from "react-bootstrap";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResultEvent, generateSampleResultData } from "../constants/MockData.js";


export default function ResultLanding(){

    const [compType, setCompType] = useState(SharedVarConstants.API_SOURCE_COMP_TYPE_EPL);
    const [compTypeHdr, setCompTypeHdr] = useState(SharedVarConstants.COMP_HEADER_EPL);
    const [resultList, setResultList] = useState<ResultEvent[]>([]);

    const selectCompType = (newCompType) => {
        setCompTypeHdr(retrieveCompHdr(SharedVarConstants, newCompType));
        setCompType(newCompType);
    };

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

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <CompSideNav compType={compType} selectCompType={selectCompType}></CompSideNav>
                    </div>
                    <div className="col-10">
                        <div className="container-fluid">
                            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                                <Card.Header className="card-header">
                                    <h2>{compTypeHdr}</h2>
                                </Card.Header>
                                <Card.Body className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 offset-md-1">
                                            <label className="control-label dates-section-label-width">Dates</label>
                                            <div className="filter-section">
                                                <select className="form-control dates-dropdown">
                                                    <option value="last24Hrs">Last 24 Hours</option>
                                                    <option value="last3Days">Last 3 Days</option>
                                                    <option value="custom">Custom Period (up to 7 days)</option>
                                                </select>
                                                <span className="dropdown-icon">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-2 offset-md-1">
                                            <label className="control-label dates-section-label-width">Date From</label>
                                            <div className="filter-section">
                                                <input type="text" className="dates-input" placeholder="DD/MM/YYYY" />
                                                {/* You would replace the mat-datepicker with your preferred datepicker component */}
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="control-label dates-section-label-width">Date To</label>
                                            <div className="filter-section">
                                                <input type="text" className="dates-input" placeholder="DD/MM/YYYY" />
                                                {/* You would replace the mat-datepicker with your preferred datepicker component */}
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <Button type="button" variant="secondary" className="btn-filter">Filter</Button>
                                        </div>
                                    </div>
                                    <br />
                                    <Table style={{ width: '80%', margin: '0 auto' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '25%' }}>Date & Time</th>
                                                <th style={{ width: '60%' }}>Event Description</th>
                                                <th style={{ width: '15%' }}>Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resultList?.map((resultEvent, index) => (
                                                <tr key={index}>
                                                    <td>{new Date(resultEvent.startTime).toLocaleDateString()} {new Date(resultEvent.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                    <td>{resultEvent.eventDesc}</td>
                                                    <td>{resultEvent.score}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        {(!resultList || resultList.length === 0) && (
                                            <tbody>
                                                <tr>
                                                    <td colSpan={parseInt("3")} style={{ textAlign: 'center' }}>No Event(s) Found.</td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}