import './OddsLanding.css';

import { useState } from 'react';
import CompSideNav from './CompSideNav.jsx';
import { Card } from 'react-bootstrap';


export default function OddsLanding({sharedVar}){

    const [compType, setCompType] = useState(null);

    const selectCompType = (newCompType) => {
        setCompType(newCompType);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <CompSideNav compType={compType} sharedVar={sharedVar} selectCompType={selectCompType}></CompSideNav>
                    </div>
                    <div className="col-8">
                        <Card>
                            <Card.Header>
                                <p>{compType}</p>
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