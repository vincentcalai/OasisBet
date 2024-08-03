import React from "react"
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../actions/ModalAction.ts";
import SharedVarConstants from "../../../constants/SharedVarConstants.ts";
import SharedVarMethods from "../../../constants/SharedVarMethods.ts";
import { updateLoginDetails } from "../../actions/LoginAction.ts";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export const LogoutModal = () => {
  const showLoginExpireModal = useSelector((state: boolean) => state['modal']['logoutModal']);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleToClose = (isConfirm) => {
    if(isConfirm){
        console.log("logout ok");
        SharedVarMethods.clearSessionStorage();
        dispatch(updateLoginDetails('isUserLoggedIn', false));
        navigate('/account', { state: { code: 0, message: '' } });
    }
    dispatch(closeModal('logoutModal'));
  };

  return (
    <Modal show={showLoginExpireModal} 
        onHide={() => handleToClose(false)} 
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{SharedVarConstants.LOGOUT_MODAL_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{SharedVarConstants.LOGOUT_MODAL_MSG}</Modal.Body>
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