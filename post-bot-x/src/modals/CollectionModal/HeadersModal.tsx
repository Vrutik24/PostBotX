import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Header } from "../../types";
import { useCollection } from "../../contexts/CollectionContext";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "70%",
  bgcolor: "#2e2b2b",
  color: "#FFFFFF",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  display: "flex",
  flexDirection: "column",
};

type HeadersModalProps = {
  open: boolean;
  onClose: () => void;
  selectedCollectionId: string;
};

const defaultHeaders: Header[] = [{ key: "", value: "" }];

const HeadersModal: React.FC<HeadersModalProps> = ({
  open,
  onClose,
  selectedCollectionId,
}) => {
  const { updateCollectionHeaders, getCollectionById } = useCollection();
  const [headers, setHeaders] = useState<Header[]>(defaultHeaders);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCollection = async () => {
      const collection = await getCollectionById(selectedCollectionId);
      if (collection) {
        setHeaders([...collection.headers, { key: "", value: "" }]);
        setLoading(false);
      }
    };

    fetchCollection();
  }, [getCollectionById, selectedCollectionId]);

  const handleDeleteRow = (index: number) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);

    setHeaders(updatedHeaders);
  };

  const handleInputChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;

    if (index === headers.length - 1 && value.trim() !== "") {
      updatedHeaders.push({ key: "", value: "" });
    }

    if (
      index !== headers.length - 1 &&
      updatedHeaders[index].key.trim() === "" &&
      updatedHeaders[index].value.trim() === ""
    ) {
      updatedHeaders.splice(index, 1);
    }

    setHeaders(updatedHeaders);
  };

  const handleSave = async () => {
    const filteredHeaders = headers.filter(
      (header) => header.key.trim() !== "" || header.value.trim() !== ""
    );

    await updateCollectionHeaders(selectedCollectionId, filteredHeaders);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Manage Headers</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            mb: 2,
            pr: 1,
            "&::-webkit-scrollbar": {
              width: "8px",
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
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress style={{ color: "green" }} />
            </div>
          ) : (
            <Table>
              <TableBody>
                {headers.map((header, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: "none"}}>
                      <OutlinedInput
                        value={header.key}
                        onChange={(e) =>
                          handleInputChange(index, "key", e.target.value)
                        }
                        placeholder="Key"
                        fullWidth
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
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none", width: "40%" }}>
                      <OutlinedInput
                        value={header.value}
                        onChange={(e) =>
                          handleInputChange(index, "value", e.target.value)
                        }
                        placeholder="Value"
                        fullWidth
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
                      />
                    </TableCell>
                    {index !== headers.length - 1 && (
                      <TableCell sx={{ borderBottom: "none", width: "10%" }}>
                        <IconButton
                          onClick={() => handleDeleteRow(index)}
                          sx={{ color: "gray" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={loading}
            sx={{
              color: "white",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "none",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF50",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={loading}
            sx={{
              color: "white",
              borderRadius: "8px",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: selectedCollectionId
                  ? "darkgreen"
                  : "rgba(255, 255, 255, 0.1)",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF50",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HeadersModal;
