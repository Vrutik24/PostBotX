import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import {
  Button,
  Checkbox,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Header } from "../../types";

const HeadersComponent = () => {
  const { formik, setCurrentCollectionId, currentCollection } =
    useAPITestFormikContext();
  const [rowAddedFlags, setRowAddedFlags] = useState<boolean[]>([]);
  const [showGlobalHeaders, setShowGlobalHeaders] = useState<boolean>(true);
  const resetRowFlags = () => {
    setRowAddedFlags(
      new Array(formik.values.queryParameters.length).fill(false)
    );
  };
  const [checkedGlobalHeaders, setCheckedGlobalHeaders] = useState<Header[]>();

  useEffect(() => {
    if (currentCollection?.collectionId) {
      setCurrentCollectionId(currentCollection.collectionId);
    }
    setCheckedGlobalHeaders(
      currentCollection?.headers.filter((x) => x.isChecked)
    );
  }, [currentCollection, setCurrentCollectionId]);

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

    // Check if the key or value is empty and uncheck the checkbox if true
    if (field === "key" && isEmptyField(newValue)) {
      headers[index].isChecked = false;
    } else if (field === "value" && isEmptyField(newValue)) {
      headers[index].isChecked = false;
    } else {
      // If both fields are filled, you may want to ensure the checkbox is checked
      headers[index].isChecked = true;
    }

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

  const handleCheckboxChange = (index: number) => {
    const headers = [...formik.values.headers];
    headers[index].isChecked = !headers[index].isChecked; // Toggle the checked state
    formik.setFieldValue("headers", headers); // Update formik state with new headers
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          {checkedGlobalHeaders && checkedGlobalHeaders.length !== 0 && (
            <TableCell
              colSpan={3}
              align="right"
              sx={{ borderBottom: "none", width: "24px", py: 0 }}
            >
              <Button
                variant="contained"
                startIcon={
                  showGlobalHeaders ? <VisibilityOff /> : <Visibility />
                }
                sx={{
                  backgroundColor: "#FFFFFF10",
                  color: "#FFFFFF99",
                  borderRadius: "30px",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#FFFFFF10",
                    color: "#FFFFFF99",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setShowGlobalHeaders(!showGlobalHeaders)}
              >
                {showGlobalHeaders
                  ? `Hide parent collection headers`
                  : `${checkedGlobalHeaders?.length} hidden`}
              </Button>
            </TableCell>
          )}
        </TableRow>
        {showGlobalHeaders &&
          checkedGlobalHeaders?.map(
            (header: { key: string; value: string }, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ borderBottom: "none", width: "24px" }}>
                  <Checkbox
                    checked={true}
                    disabled={true}
                    sx={{
                      color: "#FFFFFF",
                      padding: 0,
                      "&.Mui-checked": {
                        color: "#FFFFFF",
                      },
                      "&.Mui-disabled": {
                        color: "#FFFFFF99", // Custom color for disabled state
                      },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <OutlinedInput
                    value={header.key}
                    id={`globalHeaders.${index}.key`}
                    name={`globalHeaders.${index}.key`}
                    sx={{
                      height: "40px",
                      border: "2px solid #2b2b2b",
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#FFA24E99",
                        cursor: "not-allowed",
                      },
                      "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                        backgroundColor: "#FFFFFF05",
                      },
                    }}
                    placeholder="Key"
                    fullWidth
                    disabled={true}
                  />
                </TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <OutlinedInput
                    value={header.value}
                    id={`globalHeaders.${index}.value`}
                    name={`globalHeaders.${index}.value`}
                    sx={{
                      height: "40px",
                      border: "2px solid #2b2b2b",
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#FFFFFF99",
                        cursor: "not-allowed",
                      },
                      "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                        backgroundColor: "#FFFFFF05",
                      },
                    }}
                    placeholder="Value"
                    fullWidth
                    disabled={true}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        {formik.values.headers.map(
          (
            header: { key: string; value: string; isChecked: boolean },
            index: number
          ) => (
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
                    header.key !== "" && header.value !== "" && header.isChecked
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
                  id={`headers.${index}.key`}
                  name={`headers.${index}.key`}
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
                    border: "2px solid #2b2b2b",
                    "& .MuiInputBase-input": {
                      color: "#FFFFFF",
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
              <TableCell sx={{ borderBottom: "none", padding: 0 }}>
                {formik.values.headers.length > 1 &&
                  !(
                    index === formik.values.headers.length - 1 &&
                    isEmptyField(header.key) &&
                    isEmptyField(header.value)
                  ) && (
                    <Delete
                      className="delete-icon"
                      sx={{
                        cursor: "pointer",
                        color: "gray",
                        fontSize: 20,
                        visibility: "hidden",
                      }}
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
  );
};

export default HeadersComponent;
