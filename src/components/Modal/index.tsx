import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { User } from "../../config/types";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null >>;
  index: number;
}

function Modal({ open, handleClose, user, setUser, index }: ModalProps) {

  const handleConfirm = () => {

      const temp = [...user?.messages]

      temp.splice(index, 1)
      setUser({...user, messages: temp})
      handleClose()
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Are you sure that you want to delete the message ${index}?`} 
      </DialogTitle>
          
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you confirm, this action won't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color='success'>Confirm</Button>
        <Button onClick={handleClose} autoFocus color='error'>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export { Modal }