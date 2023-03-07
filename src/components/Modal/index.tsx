import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { deleteErrand } from "../../store/modules/errands/errandsSlice";
import { User } from "../../store/modules/typeStore";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  idErrand: string;
  idUser: string
}

function Modal({ open, handleClose, idErrand, idUser}: ModalProps) {
  const dispatch = useAppDispatch()
  const handleConfirm = () => {
    dispatch(deleteErrand({idUser, idErrand}))
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure that you want to delete the message?`}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you confirm, this action won't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="success">
          Confirm
        </Button>
        <Button onClick={handleClose} autoFocus color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { Modal };
