import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import './AlertError.css';

function AlertError() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert className="alert-component" variant="danger" onClose={() => setShow(false)} dismissible>
          <span>
            <b>This system is currently not available. Please try again at a later time.</b>
            <br />
            Error:
          </span>
        </Alert>
      );
    }
}
  
  export default AlertError;