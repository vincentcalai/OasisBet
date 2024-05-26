import React from "react";
import './LimitManagement.css';
import { Card } from "react-bootstrap";

export default function LimitManagement(){

    return (
        <div className="container-fluid">
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Limit Management</h2>
                </Card.Header>
                <Card.Body className="card-body">
                    
                </Card.Body> 
            </Card>
        </div>
    );
}