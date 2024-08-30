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
  collection?: Collection;
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

    if (collection) {
      setIsLoading(true);
      try {
        await onSubmit(
          receiverEmail.trim(),
          collection.collectionId,
          collection.name
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
                backgroundColor: "rgba(255, 255, 255, 0.1)",
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
            sx={{ marginTop: 2, backgroundColor: "#4caf50", color: "white" }} // Styling for success alert
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
