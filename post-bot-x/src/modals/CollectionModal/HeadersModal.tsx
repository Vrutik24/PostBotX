import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  IconButton,
  TableCell,
  TableRow,
  TableBody,
  Table,
  OutlinedInput,
} from "@mui/material";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import CloseIcon from "@mui/icons-material/Close";
import { Header } from "../../types";
import { Delete } from "@mui/icons-material";

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
  display: "flex",
  flexDirection: "column",
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

  const [rowAddedFlags, setRowAddedFlags] = useState<boolean[]>([]);

  const resetRowFlags = () => {
    setRowAddedFlags(
      new Array(formik.values.queryParameters.length).fill(false)
    );
  };

  const deleteHeader = (i: number) => {
    const newHeaders =
      formik.values.headers.length === 1
        ? formik.initialValues.headers
        : formik.values.headers.filter((_, index) => index !== i);

    formik.setFieldValue("headers", newHeaders);
    resetRowFlags();
  };

  const isEmptyField = (value: string) => !value || value === "";

  const isRowEmpty = (
    headers: Header[],
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    return (
      isEmptyField(value) &&
      (field === "key"
        ? isEmptyField(headers[index].value)
        : isEmptyField(headers[index].key))
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: "key" | "value"
  ) => {
    const { headers } = formik.values;
    const isLastRow = index === headers.length - 1;
    const newValue = e.target.value;

    if (isRowEmpty(headers, index, field, newValue) && !isLastRow) {
      deleteHeader(index);
    } else {
      if (
        isLastRow &&
        !rowAddedFlags[index] &&
        (headers[index].key || newValue)
      ) {
        setRowAddedFlags((prevFlags) => {
          const updatedFlags = [...prevFlags];
          updatedFlags[index] = true;
          return updatedFlags;
        });
        formik.setFieldValue("headers", [...headers, { key: "", value: "" }]);
      }

      formik.setFieldValue(`headers.${index}.${field}`, newValue);
    }
  };

  const handleSave = () => {
    onSave(formik.values.headers);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* should be on the top, fixed */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
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
        {/* should be on the middle, if content of the table overflows then this bozx should be scrollable*/}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            marginBottom: 2,
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          <Table>
            <TableBody>
              {formik.values.headers.map(
                (header: { key: string; value: string }, index: number) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <OutlinedInput
                        value={header.key}
                        id={`headers.${index}.key`}
                        name={`headers.${index}.key`}
                        sx={{
                          height: "40px",
                          border: "1px solid gray",
                          "&.Mui-focused": {
                            border: "1px solid blue",
                          },
                          "& .MuiInputBase-input": {
                            color: "#FFA24E",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "gray",
                            opacity: 1,
                          },
                        }}
                        onChange={(e) => handleInputChange(e, index, "key")}
                        placeholder="Key"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <OutlinedInput
                        value={header.value}
                        id={`headers.${index}.value`}
                        name={`headers.${index}.value`}
                        sx={{
                          height: "40px",
                          border: "1px solid gray",
                          "&.Mui-focused": {
                            border: "1px solid blue",
                          },
                          "& .MuiInputBase-input": {
                            color: "white",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "gray",
                            opacity: 1,
                          },
                        }}
                        onChange={(e) => handleInputChange(e, index, "value")}
                        placeholder="Value"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      {formik.values.headers.length > 1 &&
                        !(
                          index === formik.values.headers.length - 1 &&
                          isEmptyField(header.key) &&
                          isEmptyField(header.value)
                        ) && (
                          <Delete
                            sx={{ cursor: "pointer", color: "gray" }}
                            onClick={() => {
                              deleteHeader(index);
                            }}
                          />
                        )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Box>
        {/* should be in the bottom, fixed */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
