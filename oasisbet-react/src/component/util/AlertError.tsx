import React from "react";
import { Alert } from "react-bootstrap";
import './AlertError.css';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

function AlertError() {
    const showError = useSelector((state: any) => state['error']['showError']);
    const errorText = useSelector((state: any) => state['error']['errorText']);
    
    const onClose = () => {
        console.log("closing AlertError modal");
    }
    
    return (
    showError && 
        <Alert className="alert alert-component view-system-messages" variant="danger" onClose={() => onClose()} dismissible>
            <span>
                <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '8px' }} /> 
                <b>This system is currently not available. Please try again at a later time.</b>
                <br />
                {errorText && `Error: ${errorText}`}
            </span>
        </Alert>
    );
}
  
export default AlertError;


