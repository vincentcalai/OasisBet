import React, { useState, useEffect } from 'react';
import './ConfirmDialog.css';
import SharedVarConstants from '../../../constants/SharedVarConstants';
import { Card } from 'react-bootstrap';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: (result?: string) => void;
    data: {
      title: string;
      type: string;
    };
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, data }) => {
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
        setDialogTitle(data.title);
        setDialogMessage(retrieveDialogMessage(data.type));
        document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
  }, [isOpen, data]);

  const retrieveDialogMessage = (dialogType) => {
    switch (dialogType) {
      case SharedVarConstants.CREATE_USER_DIALOG_TYPE:
        return SharedVarConstants.CREATE_USER_DIALOG_MSG;
      case SharedVarConstants.CFM_DEPOSIT_DIALOG_TYPE:
        return SharedVarConstants.CFM_DEPOSIT_DIALOG_MSG;
      case SharedVarConstants.CFM_WITHDRAW_DIALOG_TYPE:
        return SharedVarConstants.CFM_WITHDRAW_DIALOG_MSG;
      case SharedVarConstants.CFM_CHANGE_LIMIT_DIALOG_TYPE:
        return SharedVarConstants.CFM_CHANGE_LIMIT_DIALOG_MSG;
      case SharedVarConstants.CFM_UPDATE_PW_DIALOG_TYPE:
        return SharedVarConstants.CFM_UPDATE_PW_DIALOG_MSG;
      case SharedVarConstants.CFM_UPDATE_ACC_DETAILS_DIALOG_TYPE:
        return SharedVarConstants.CFM_UPDATE_ACC_DETAILS_DIALOG_MSG;
      default:
        return '';
    }
  };

  const handleCancelClick = () => {
    onClose('cancel');
  };

  const handleConfirmClick = () => {
    onClose('confirm');
  };

  return (
    isOpen && (
        <div className="dialog-overlay">
            <Card className="card dialog">
                <Card.Header className="card-header dialog-header">
                    <h2>{dialogTitle}</h2>
                </Card.Header>
                <Card.Body className="card-body dialog-body">
                    <br></br>
                    <p>{dialogMessage}</p>
                    <div className="dialog-footer">
                        <button className="btn btn-success btn-decline" onClick={handleCancelClick}>Cancel</button>
                        <button className="btn btn-success btn-confirm" onClick={handleConfirmClick}>Confirm</button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
  );
};

export default ConfirmDialog;
