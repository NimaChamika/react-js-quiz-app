import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function FeedbackDialog({ data, onClose }) {
  const onActionBtnClick = () => {
    onClose();
  };

  return (
    <Dialog fullWidth open sx={{ zIndex: 95 }}>
      <DialogTitle color="black">{data.title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{data.msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onActionBtnClick} variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FeedbackDialog;
