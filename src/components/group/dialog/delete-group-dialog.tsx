import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useTheme, Theme } from "@mui/material";
import * as React from "react";
import { dialogSx } from "../../dialog/styles";

interface DeleteGroupDialogProps {
    isOpen: boolean;
    theme: Theme;
    handleClose: () => void;
    onSubmit: () => void;
}

export default function DeleteGroupDialogProps({
    isOpen, 
    theme, 
    handleClose, 
    onSubmit
  }: DeleteGroupDialogProps) {
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={dialogSx(theme)}
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Group"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure? 
            This will permanently delete the group. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onSubmit} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }