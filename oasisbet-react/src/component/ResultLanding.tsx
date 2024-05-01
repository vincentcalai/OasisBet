import React, { useState } from "react";
import './ResultLanding.css';
import SharedVarConstants from "../constants/SharedVarConstants";
import CompSideNav from './CompSideNav.tsx';
import { Card } from "react-bootstrap";


export default function ResultLanding(){

    const [compType, setCompType] = useState(SharedVarConstants.API_SOURCE_COMP_TYPE_EPL);
    const [compTypeHdr, setCompTypeHdr] = useState(SharedVarConstants.COMP_HEADER_EPL);

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
                    <div className="col-8">
                        <div className="container-fluid">
                            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                                <Card.Header className="card-header">
                                    <h2>{compTypeHdr}</h2>
                                </Card.Header>
                                <Card.Body className="card-body">
                                    
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}