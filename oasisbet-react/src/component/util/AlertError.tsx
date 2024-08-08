import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import './AlertError.css';
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AlertError() {
    const [show, setShow] = useState(true);
  
      return (
        show && 
            <Alert className="alert alert-component view-system-messages" variant="danger" onClose={() => setShow(false)} dismissible>
                <span>
                    <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '8px' }} /> 
                    <b>This system is currently not available. Please try again at a later time.</b>
                    <br />
                    Error:
                </span>
            </Alert>
      );
}
  
  export default AlertError;