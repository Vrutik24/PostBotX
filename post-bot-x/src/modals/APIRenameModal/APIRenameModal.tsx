import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API, Collection } from "../../types";

interface CollectionModalProps {
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
  bgcolor: "#2e2b2b",
  color: "#FFFFFF",
  boxShadow: 24,
  py: 2,
  px: 3,
  border: "none",
  borderRadius: 2,
};

const APIRenameModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  api,
}) => {
  const [apiName, setAPIName] = useState("");

  useEffect(() => {
    setAPIName(api?.name || "");
  }, [api]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAPIName(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(apiName.trim(), api?.id);
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
          <Typography>
            Rename API
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              borderRadius: "8px",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <TextField
          placeholder="API Name"
          value={apiName}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
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
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "none",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "8px",
              backgroundColor:  "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF50",
              },
            }}
            disabled={apiName.trim() === ""}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default APIRenameModal;
