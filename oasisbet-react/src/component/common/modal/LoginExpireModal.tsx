import React from "react"
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../actions/ModalAction.ts";

export const LoginExpireModal = () => {
    const showLoginExpireModal = useSelector((state: boolean) => state['modal']['loginExpireModal']);

    const dispatch = useDispatch();
    
    const handleToClose = (isConfirm: boolean) => {
        dispatch(closeModal('loginExpireModal'));
    };

    return (
        <React.Fragment>
        <Dialog
            open={showLoginExpireModal}
            onClose={handleToClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Extend Login Session?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                You have been inactive for a while. Do you want to extend your login session?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => handleToClose(false)}>No</Button>
            <Button onClick={() => handleToClose(true)} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}