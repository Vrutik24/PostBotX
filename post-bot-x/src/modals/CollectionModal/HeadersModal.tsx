import React, { useState } from "react";
import { Modal, Box, Button, Typography, IconButton } from "@mui/material";
import DynamicParamsTable from "../../shared/components/DynamicParamsTable";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "#2e2b2b",
  color: "#FFFFFF",
  boxShadow: 24,
  py: 2,
  px: 3,
  border: "none",
  borderRadius: 2,
};

type HeadersModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (headers: { key: string; value: string[] | string }[]) => void;
};

const HeadersModal: React.FC<HeadersModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const { formik } = useAPITestFormikContext();

  const handleValueChange = (index: number, field: string, value: string) => {
    formik.setFieldValue(`headers.${index}.${field}`, value);
  };

  const handleDelete = (index: number) => {
    if (formik.values.headers.length === 1) {
      formik.setFieldValue("headers", formik.initialValues.headers);
    } else {
      const newHeaders = formik.values.headers.filter((_, i) => i !== index);
      formik.setFieldValue("headers", newHeaders);
    }
  };

  const handleAddNewItem = () => {
    formik.setFieldValue("headers", [
      ...formik.values.headers,
      { key: "", value: "" },
    ]);
  };

  const handleSave = () => {
    onSave(formik.values.headers);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Typography>Manage Headers</Typography>
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
        <Box
          sx={{
            marginBottom: 5,
            height: "60%"
          }}
        >
          <DynamicParamsTable
            items={formik.values.headers}
            onValueChange={handleValueChange}
            onDelete={handleDelete}
            addNewItem={handleAddNewItem}
            showAddButton={true}
            showDeleteButton={true}
            placeholder={{ key: "Header", value: "Value" }}
            valueType="multiple"
          />
        </Box>
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
            //disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSave}
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "8px",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF50",
              },
            }}
            //disabled={Boolean(formik.errors.name) || loading}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HeadersModal;
