import React, { useEffect, useMemo, useState } from "react";
import './ResultLanding.css';
import SharedVarConstants from "../../constants/SharedVarConstants.ts";
import CompSideNav from '../common/CompSideNav.tsx';
import { Button, Card, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResultEvent } from "../../constants/MockData.ts";
import { fetchResults } from "../../services/api/ApiService.ts";
import DateError from "../util/DateError.tsx";
import AlertError from "../util/AlertError.tsx";
import { closeAlert } from "../actions/ReducerAction.ts";
import { useDispatch } from "react-redux";


export default function ResultLanding(){

    const dispatch = useDispatch();

    const currentDate = new Date();
    const last24Hours = SharedVarConstants.MILLI_SEC_24_HRS;
    const fromDate = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000) - last24Hours);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);

    const [compType, setCompType] = useState(SharedVarConstants.API_SOURCE_COMP_TYPE_EPL);
    const [compTypeHdr, setCompTypeHdr] = useState(SharedVarConstants.COMP_HEADER_EPL);
    const [resultList, setResultList] = useState<ResultEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState('last24Hrs');
    const [dateFrom, setDateFrom] = useState<Date | null>(fromDate);
    const [dateTo, setDateTo] = useState<Date | null>(currentDate);
    const [dateErrorMsg, setDateErrorMsg] = useState('');


    useEffect(() => {
        dispatch(closeAlert());
        fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compType]); 

    useEffect(() => {
        const currentDate = new Date();
        if (selectedDate === SharedVarConstants.LAST_24_HRS) {
            const last24Hours = SharedVarConstants.MILLI_SEC_24_HRS;
            const fromDate = new Date(currentDate.getTime() - last24Hours);
            setDateFrom(fromDate);
            setDateTo(currentDate);
        } else if (selectedDate === SharedVarConstants.LAST_3_DAYS) {
            const last3Days = SharedVarConstants.MILLI_SEC_3_DAYS;
            const fromDate = new Date(currentDate.getTime() - last3Days);
            setDateFrom(fromDate);
            setDateTo(currentDate);
        } else {
            setDateFrom(null);
            setDateTo(null);
        }
    }, [selectedDate]);

    const selectCompType = (newCompType) => {
        setCompTypeHdr(retrieveCompHdr(SharedVarConstants, newCompType));
        setCompType(newCompType);
    };

    const handleDateSelectionChange = (event) => {
        const key = event.target.value;
        setSelectedDate(key);
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

    function handleFilterClick(event): void {
        console.log("Click Filter event: ", selectedDate, " dateFrom: ", dateFrom, " dateTo: ", dateTo, " compType: ", compType);
        fetchData();
    }

    const fetchData = async () => {
        try {
        const updatedEvents = await fetchResults(compType, selectedDate, dateFrom, dateTo);
        setResultList(updatedEvents);
        } catch (error) {
        // Handle error
        }
    };

    const isFilterDisabled = useMemo(() => {
        if (!dateFrom || !dateTo) {
            return true;
        } 
        if (dateFrom > dateTo) {
            setDateErrorMsg(SharedVarConstants.INVALID_DATE_FROM_AND_TO_ERR_MSG);
            return true;
        }
        setDateErrorMsg("");
        return false;
    }, [dateFrom, dateTo]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <CompSideNav compType={compType} selectCompType={selectCompType}></CompSideNav>
                    </div>
                    <div className="col-10">
                        <div className="container-fluid">
                            <br />
                            <AlertError></AlertError>
                            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                                <Card.Header className="card-header">
                                    <h2>{compTypeHdr}</h2>
                                </Card.Header>
                                <Card.Body className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 offset-md-1">
                                            <label className="control-label dates-section-label-width">Dates</label>
                                            <div className="filter-section">
                                                <select className="dates-dropdown" value={selectedDate} onChange={handleDateSelectionChange}>
                                                    <option value="last24Hrs">Last 24 Hours</option>
                                                    <option value="last3Days">Last 3 Days</option>
                                                    <option value="custom">Custom Period (up to 7 days)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2 offset-md-1">
                                            <label className={`control-label dates-section-label-width error-text ${dateErrorMsg ? 'highlightLabel' : ''}`}>
                                                Date From</label>
                                            <div className="filter-section">
                                                <DatePicker
                                                    showIcon
                                                    selected={dateFrom}
                                                    onChange={(date: Date | null) => setDateFrom(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    minDate={minDate}
                                                    maxDate={maxDate}
                                                    className="dates-input"
                                                    placeholderText="DD/MM/YYYY"
                                                    disabled={selectedDate !== 'custom'}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className={`control-label dates-section-label-width error-text ${dateErrorMsg ? 'highlightLabel' : ''}`}>
                                                Date To</label>
                                            <div className="filter-section">
                                                <DatePicker
                                                    showIcon
                                                    selected={dateTo}
                                                    onChange={(date: Date | null) => setDateTo(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    minDate={minDate}
                                                    maxDate={maxDate}
                                                    className="dates-input"
                                                    placeholderText="DD/MM/YYYY"
                                                    disabled={selectedDate !== 'custom'}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <Button type="button" variant="secondary" className="btn-filter" 
                                                    disabled={isFilterDisabled} onClick={handleFilterClick} >Filter</Button>
                                        </div>
                                    </div>

                                    <DateError dateErrorMsg={dateErrorMsg} />

                                    <br />
                                    <Table style={{ width: '80%', margin: '0 auto' }}>
                                        <thead className="table-primary table-header">
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
                                                    <td>{resultEvent.score ? resultEvent.score : 'Pending'}</td>
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

