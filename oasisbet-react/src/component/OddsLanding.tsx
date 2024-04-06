import './OddsLanding.css';

import { useState } from 'react';
import CompSideNav from './CompSideNav.tsx';
import { Card } from 'react-bootstrap';
import React from 'react';


export default function OddsLanding({sharedVar}){
    
    const [compType, setCompType] = useState(null);
    const [compTypeHdr, setCompTypeHdr] = useState(sharedVar.COMP_HEADER_EPL);

    const selectCompType = (newCompType) => {
        setCompTypeHdr(retrieveCompHdr(sharedVar, newCompType));
        setCompType(newCompType);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <CompSideNav compType={compType} sharedVar={sharedVar} selectCompType={selectCompType}></CompSideNav>
                    </div>
                    <div className="col-7">
                        <Card className="card">
                            <Card.Header className="card-header">
                                <h2>{compTypeHdr}</h2>
                            </Card.Header>
                            <Card.Body className="card-body">
                                <p>{compType}</p>
                            </Card.Body>
                        </Card>
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
