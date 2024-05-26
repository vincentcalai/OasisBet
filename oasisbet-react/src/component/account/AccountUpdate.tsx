import React from "react";
import './AccountUpdate.css';
import { Card } from "react-bootstrap";

export default function AccountUpdate(){

    return (
        <div className="container-fluid">
            <Card className="card" style={{tableLayout: 'fixed', width: '100%', marginLeft: '30px' }}>
                <Card.Header className="card-header">
                    <h2>Account Update</h2>
                </Card.Header>
                <Card.Body className="card-body">
                    
                </Card.Body> 
            </Card>
        </div>
    );
}