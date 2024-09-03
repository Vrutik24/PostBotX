import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Collection } from "../../types";

interface CollectionShareModalProps {
  selectedCollection?: Collection;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    receiverEmail: string,
    id: string,
    collectionName: string
  ) => Promise<void>;
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

const CollectionShareModal: React.FC<CollectionShareModalProps> = ({
  selectedCollection,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setReceiverEmail("");
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  const handleReceiverEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiverEmail(event.target.value);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!isValidEmail(receiverEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (selectedCollection) {
      setIsLoading(true);
      try {
        await onSubmit(
          receiverEmail.trim(),
          selectedCollection.collectionId,
          selectedCollection.name
        );
        setSuccessMessage("Collection shared successfully!");
        setErrorMessage("");
        setReceiverEmail("");
        setTimeout(() => onClose(), 500);
      } catch (error: any) {
        console.error("Failed to share collection action:", error);
        setErrorMessage(
          error.message || "An error occurred while sharing the collection."
        );
      } finally {
        setIsLoading(false);
      }
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
          <Typography>Share Collection</Typography>
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
          placeholder="Receiver's Email"
          value={receiverEmail}
          onChange={handleReceiverEmailChange}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              border: "1px solid rgb(29 28 28)",
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
              backgroundColor: "rgb(29 28 28)",
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
              backgroundColor: selectedCollection
                ? "#4CAF50"
                : "rgb(29 28 28)",
              "&:hover": {
                backgroundColor: selectedCollection
                  ? "darkgreen"
                  : "rgb(29 28 28)",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgb(29 28 28)",
                color: "#FFFFFF50",
              },
            }}
            disabled={receiverEmail.trim() === "" || isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Share"
            )}
          </Button>
        </Box>
        {errorMessage && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert
            sx={{ marginTop: 2, backgroundColor: "#4CAF50", color: "white" }} // Styling for success alert
            severity="success"
          >
            {successMessage}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default CollectionShareModal;
