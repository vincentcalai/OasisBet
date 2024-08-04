import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SharedVarConstants from "../../../constants/SharedVarConstants.ts";
import { closeModal } from "../../actions/ModalAction.ts";

export const LoginSessionExtend = () => {
    const showLoginSessionExtendModal = useSelector((state: boolean) => state['modal']['loginSessionExtendModal']);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleToClose = (isConfirm) => {
      if(isConfirm){
        console.log("login session extend ok");
        
      } 
      dispatch(closeModal('loginSessionExtendModal'));
    };
  
    return (
      <Modal show={showLoginSessionExtendModal} 
          onHide={() => handleToClose(false)} 
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{SharedVarConstants.LOGIN_EXTEND_SESSION_TITLE}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{SharedVarConstants.LOGIN_EXTEND_SESSION_MSG}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleToClose(false)}>
              No
            </Button>
            <Button variant="success" onClick={() => handleToClose(true)}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>
    );
  }