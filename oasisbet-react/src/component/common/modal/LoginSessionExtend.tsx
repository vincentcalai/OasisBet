import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import SharedVarConstants from "../../../constants/SharedVarConstants.ts";
import { closeModal } from "../../actions/ModalAction.ts";
import { refreshJwtToken } from "../../../services/api/ApiService.ts";

export const LoginSessionExtend = () => {
    const showLoginSessionExtendModal = useSelector((state: boolean) => state['modal']['loginSessionExtendModal']);
  
    const dispatch = useDispatch();
    
    const handleToClose = async (isConfirm) => {
      if(isConfirm){
        console.log("login session extend ok");
        //Try refresh JWT token
        try {
            const response = await refreshJwtToken();
            if (response.token) {
              sessionStorage.setItem(SharedVarConstants.AUTHORIZATION, `Bearer ${response.token}`);
              sessionStorage.setItem(SharedVarConstants.LAST_AUTH_TIME, Date.now().toString());
            } else {
              throw new Error();
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
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