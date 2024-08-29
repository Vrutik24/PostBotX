import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Collection } from "../../types";

interface CollectionShareModalProps {
  collection?: Collection;
  isOpen: boolean;
  action?: string;
  onClose: () => void;
  onSubmit: (receiverEmail: string, id: string, collectionName: string) => void;
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

const CollectionShareModal: React.FC<CollectionShareModalProps> = ({
  collection,
  isOpen,
  action,
  onClose,
  onSubmit,
}) => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setReceiverEmail(collection?.name || "");
  }, [collection]);

  const handleReceiverEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiverEmail(event.target.value);
  };

  const handleSubmit = () => {
    try {
      if (collection) {
        onSubmit(
          receiverEmail.trim(),
          collection.collectionId,
          collection.name
        );
      }
    } catch (error : any) {
      console.error("Failed to Share collection action:", error);
      setErrorMessage(error.message);
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
          <Typography>
            {collection ? `${action} Collection` : "Create Collection"}
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
          placeholder="Collection Name"
          value={receiverEmail}
          onChange={handleReceiverEmailChange}
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
              backgroundColor: collection
                ? "green"
                : "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: collection
                  ? "darkgreen"
                  : "rgba(255, 255, 255, 0.1)",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF50",
              },
            }}
            disabled={receiverEmail.trim() === ""}
          >
            {collection ? "Save" : "Create"}
          </Button>
        </Box>
        {errorMessage && (
        <Alert
          sx={{ position: "absolute", bottom: 0, right: 0, margin: "20px" }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
      </Box>
    </Modal>
  );
};

export default CollectionShareModal;
