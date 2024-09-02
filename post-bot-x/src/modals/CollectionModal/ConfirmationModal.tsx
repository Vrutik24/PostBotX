import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  collectionName: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  collectionName,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        onKeyDown={(e) => e.key === "Enter" && onConfirm()}
        sx={{
          position: "absolute",
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Typography>Delete the collection "{collectionName}"?</Typography>
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
        {/* <Typography
          sx={{
            mt: 2,
            mb: 2,
            color: "#ffffff",
          }}
        >
          Are you sure?
        </Typography> */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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
            onClick={onConfirm}
            variant="contained"
            sx={{
              color: "black",
              borderRadius: "8px",
              backgroundColor: "#ff665b",
              "&:hover": {
                backgroundColor: "#ff968f",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
