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
    
    const handleToClose = () => {
        dispatch(closeModal('loginExpireModal'));
    };

    return (
        <div>
            <Dialog open={showLoginExpireModal} onClose={handleToClose}>
                <DialogTitle>{"How are you?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        I am Good, Hope the same for you!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose}
                        color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}