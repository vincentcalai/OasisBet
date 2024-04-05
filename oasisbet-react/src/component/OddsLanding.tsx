import './OddsLanding.css';

import { useState } from 'react';
import CompSideNav from './CompSideNav.tsx';
import { Card } from 'react-bootstrap';
import React from 'react';


export default function OddsLanding({sharedVar}){

    const [compType, setCompType] = useState(null);

    const selectCompType = (newCompType) => {
        setCompType(newCompType);
    };

    let competitionTypeHdr: string = sharedVar.COMP_HEADER_EPL;

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
                                <p>{competitionTypeHdr}</p>
                            </Card.Header>
                            <Card.Body>
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