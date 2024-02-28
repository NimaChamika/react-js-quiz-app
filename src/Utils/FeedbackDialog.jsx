import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function FeedbackDialog({ data, onClose, isCancelBtnActive = false }) {
  const onActionBtnClick = (state) => {
    onClose(state);
  };

  return (
    <Dialog fullWidth open sx={{ zIndex: 95 }}>
      <DialogTitle color="black">{data.title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{data.msg}</DialogContentText>

        {isCancelBtnActive && (
          <IconButton
            aria-label="close"
            onClick={() => {
              onActionBtnClick(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onActionBtnClick(true);
          }}
          variant="contained"
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FeedbackDialog;
