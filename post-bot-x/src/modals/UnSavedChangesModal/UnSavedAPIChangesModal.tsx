import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeave: () => void;
}

const UnSavedAPIChangesModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onLeave,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        onKeyDown={(e) => e.key === "Enter" && onLeave()}
        sx={{
          position: "absolute",
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
        }}
      >
        <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
          <Typography>Leav API?</Typography>
          <Typography>Changes you made may not be saved.</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            marginTop: "40px",
          }}
        >
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: "white",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "none",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onLeave}
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "8px",
              backgroundColor: "#4CAF50",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Leave
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UnSavedAPIChangesModal;
