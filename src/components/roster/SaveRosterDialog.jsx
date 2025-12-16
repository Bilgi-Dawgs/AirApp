import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  RadioGroup,
  Paper,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import SaveIcon from "@mui/icons-material/Save";

const SaveRosterDialog = ({ open, onClose, onConfirm }) => {
  const [dbChoice, setDbChoice] = useState("sql");

  const handleConfirm = () => {
    onConfirm(dbChoice);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 3, minWidth: 400 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#0a1929",
          fontWeight: "bold",
        }}
      >
        <StorageIcon color="primary" /> Save Roster Options
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText sx={{ mb: 2 }}>
          Please select the target database for persisting this roster
          configuration:
        </DialogContentText>

        <RadioGroup
          value={dbChoice}
          onChange={(e) => setDbChoice(e.target.value)}
        >
          <Paper
            variant="outlined"
            sx={{
              mb: 1,
              border:
                dbChoice === "sql" ? "2px solid #1976d2" : "1px solid #ddd",
            }}
          >
            <FormControlLabel
              value="sql"
              control={<Radio />}
              label={
                <Typography fontWeight="bold">
                  SQL Database (Relational)
                </Typography>
              }
              sx={{ p: 1, width: "100%", m: 0 }}
            />
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              border:
                dbChoice === "nosql" ? "2px solid #ed6c02" : "1px solid #ddd",
            }}
          >
            <FormControlLabel
              value="nosql"
              control={<Radio color="warning" />}
              label={
                <Typography fontWeight="bold">
                  NoSQL Database (Document)
                </Typography>
              }
              sx={{ p: 1, width: "100%", m: 0 }}
            />
          </Paper>
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: "#666" }}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={dbChoice === "nosql" ? "warning" : "primary"}
          startIcon={<SaveIcon />}
        >
          Confirm & Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveRosterDialog;
