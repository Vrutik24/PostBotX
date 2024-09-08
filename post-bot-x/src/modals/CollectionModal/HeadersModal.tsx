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
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Collection, Header } from "../../types";
import { useCollection } from "../../contexts/CollectionContext";
import { Delete } from "@mui/icons-material";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "70%",
  bgcolor: "rgb(29 28 28)",
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
  selectedCollection: Collection;
};

const defaultHeaders: Header[] = [{ key: "", value: "", isChecked: false }];

const HeadersModal: React.FC<HeadersModalProps> = ({
  open,
  onClose,
  selectedCollection,
}) => {
  const { updateCollectionHeaders, getCollectionById } = useCollection();
  const { setCurrentCollection } = useAPITestFormikContext();
  const [headers, setHeaders] = useState<Header[]>(defaultHeaders);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchCollection = async () => {
    const collection = await getCollectionById(selectedCollection.id || "");
    if (collection) {
      setHeaders([
        ...collection.headers,
        { key: "", value: "", isChecked: false },
      ]);
      setLoading(false);
      setCurrentCollection(collection);
    }
  };
  useEffect(() => {
    fetchCollection();
  }, [getCollectionById, selectedCollection]);

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

    // Check if the key or value is empty and uncheck the checkbox if true
    if (field === "key" && (!value || value.trim() === "")) {
      updatedHeaders[index].isChecked = false;
    } else if (field === "value" && (!value || value.trim() === "")) {
      updatedHeaders[index].isChecked = false;
    } else {
      // If both fields are filled, you may want to ensure the checkbox is checked
      updatedHeaders[index].isChecked = true;
    }

    if (index === headers.length - 1 && value.trim() !== "") {
      updatedHeaders.push({ key: "", value: "", isChecked: false });
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

    await updateCollectionHeaders(
      selectedCollection.collectionId,
      filteredHeaders
    );
    fetchCollection();
    onClose();
  };

  const handleCheckboxChange = (index: number) => {
    headers[index].isChecked = !headers[index].isChecked; // Toggle the checked state
    setHeaders([...headers]);
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
            paddingRight: 2,
            "&::-webkit-scrollbar": {
              width: "4px",
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
              <CircularProgress style={{ color: "#4CAF50" }} />
            </div>
          ) : (
            <Table>
              <TableBody>
                {headers.map((header, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover .delete-icon": {
                        visibility: "visible",
                      },
                    }}
                  >
                    <TableCell sx={{ borderBottom: "none", width: "24px" }}>
                      <Checkbox
                        checked={
                          header.key !== "" &&
                          header.value !== "" &&
                          header.isChecked
                        }
                        onChange={() => handleCheckboxChange(index)}
                        sx={{
                          color: "#FFFFFF",
                          padding: 0,
                          "&.Mui-checked": {
                            color: "#FFFFFF",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <OutlinedInput
                        value={header.key}
                        onChange={(e) =>
                          handleInputChange(index, "key", e.target.value)
                        }
                        placeholder="Key"
                        fullWidth
                        sx={{
                          height: "40px",
                          border: "2px solid #2b2b2b",
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
                    <TableCell sx={{ borderBottom: "none" }}>
                      <OutlinedInput
                        value={header.value}
                        onChange={(e) =>
                          handleInputChange(index, "value", e.target.value)
                        }
                        placeholder="Value"
                        fullWidth
                        sx={{
                          height: "40px",
                          border: "2px solid #2b2b2b",
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
                      <TableCell sx={{ borderBottom: "none", padding: 0 }}>
                        {/* <IconButton
                          onClick={() => handleDeleteRow(index)}
                          sx={{ color: "gray" }}
                        >
                          <DeleteIcon />
                        </IconButton> */}
                        <Delete
                          className="delete-icon"
                          sx={{
                            cursor: "pointer",
                            color: "gray",
                            fontSize: 20,
                            visibility: "hidden",
                          }}
                          onClick={() => {
                            handleDeleteRow(index);
                          }}
                        />
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
              backgroundColor: "#2b2b2b",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "none",
              },
              "&.Mui-disabled": {
                backgroundColor: "#2b2b2b",
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
              backgroundColor: "#4CAF50",
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
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HeadersModal;
