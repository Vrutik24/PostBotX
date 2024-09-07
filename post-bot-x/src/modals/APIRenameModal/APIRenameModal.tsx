import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API, Collection } from "../../types";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";

interface APIRenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newName: string, id?: string) => void;
  api?: API;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(29 28 28)",
  color: "#FFFFFF",
  boxShadow: 24,
  py: 2,
  px: 3,
  border: "none",
  borderRadius: 2,
};

const APIRenameModal: React.FC<APIRenameModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  api,
}) => {
  const [currentAPIName, setCurrentAPIName] = useState("");
  useEffect(() => {
    setCurrentAPIName(api?.name || "");
  }, [api]);
  const [loading, setLoading] = useState(false);
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentAPIName(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(currentAPIName.trim(), api?.id);
    } catch {
      console.log("API rename failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Rename API</Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgb(29 28 28)",
              },
              borderRadius: "8px",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          placeholder="API Name"
          value={currentAPIName}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              border: "1px solid #2b2b2b",
              borderRadius: "8px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
                borderRadius: "8px",
              },
              "&:hover:not(.Mui-focused) fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "white",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2b2b2b",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "none",
              },
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
              "&.Mui-disabled": {
                backgroundColor: "#252525",
                color: "#FFFFFF50",
              },
            }}
            disabled={currentAPIName.trim() === ""  || loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#4CAF50" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default APIRenameModal;
