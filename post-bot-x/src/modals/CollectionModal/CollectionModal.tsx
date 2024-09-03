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
import { Collection } from "../../types";
import * as Yup from "yup";
import { useFormik } from "formik";

interface CollectionModalProps {
  selectedCollection?: Collection;
  isOpen: boolean;
  action?: string;
  onClose: () => void;
  onSubmit: (newName: string, id?: string) => void;
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

const validationSchema = Yup.object({
  name: Yup.string().required(),
});

const CollectionModal: React.FC<CollectionModalProps> = ({
  selectedCollection,
  isOpen,
  action,
  onClose,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: selectedCollection?.name || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await onSubmit(values.name.trim(), selectedCollection?.collectionId);
        formik.resetForm();
      } finally {
        setLoading(false);
      }
    },
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
  });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              {selectedCollection
                ? `${action} Collection`
                : "Create Collection"}
            </Typography>
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
            placeholder="Collection Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
              type="submit"
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
              disabled={Boolean(formik.errors.name) || loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#4CAF50" }} />
              ) : selectedCollection ? (
                "Save"
              ) : (
                "Create"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CollectionModal;
