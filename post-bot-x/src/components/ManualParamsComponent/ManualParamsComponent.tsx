import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Delete, AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";

const ManualParamsComponent = () => {
  const { formik } = useAPITestFormikContext();
  const [rowAddedFlags, setRowAddedFlags] = useState<boolean[]>([]);

  const resetRowFlags = () => {
    setRowAddedFlags(
      new Array(formik.values.manualQueryParameters.length).fill(false)
    );
  };

  const deleteManualQueryParameter = (i: number) => {
    if (formik.values.manualQueryParameters.length === 1) {
      formik.setFieldValue(
        "manualQueryParameters",
        formik.initialValues.manualQueryParameters
      );
      resetRowFlags();
    } else {
      const newQueryParameters = formik.values.manualQueryParameters.filter(
        (queryParameter, index) => index !== i
      );
      formik.setFieldValue("manualQueryParameters", newQueryParameters);
      resetRowFlags();
    }
  };

  // Helper function to check if all values in the array are empty or undefined
  const areAllValuesEmpty = (valueArray: string[]) => {
    return valueArray.every((value) => !value || value === "");
  };

  const isRowEmpty = (
    manualQueryParameters: {
      key: string;
      value: string[];
    }[],
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    return (
      isEmptyField(value) &&
      (field === "key"
        ? areAllValuesEmpty(manualQueryParameters[index].value)
        : isEmptyField(manualQueryParameters[index].key))
    );
  };

  const isEmptyField = (value: string) => !value || value === "";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: "key" | `value.${number}`
  ) => {
    const { manualQueryParameters } = formik.values;
    const isLastRow = index === manualQueryParameters.length - 1;
    const newValue = e.target.value;

    // For checking the specific value field
    const fieldKey = field.startsWith("value") ? "value" : "key";

    // Check if the key or any value is empty, uncheck the checkbox if true
    if (fieldKey === "key" && isEmptyField(newValue)) {
      manualQueryParameters[index].isChecked = false;
    } else if (
      fieldKey === "value" &&
      areAllValuesEmpty(manualQueryParameters[index].value)
    ) {
      manualQueryParameters[index].isChecked = false;
    } else {
      manualQueryParameters[index].isChecked = true;
    }

    if (
      isRowEmpty(manualQueryParameters, index, fieldKey, newValue) &&
      !isLastRow
    ) {
      deleteManualQueryParameter(index);
    } else {
      if (
        isLastRow &&
        !rowAddedFlags[index] &&
        (manualQueryParameters[index].key || newValue)
      ) {
        setRowAddedFlags((prevFlags) => {
          const updatedFlags = [...prevFlags];
          updatedFlags[index] = true;
          return updatedFlags;
        });
        formik.setFieldValue("manualQueryParameters", [
          ...manualQueryParameters,
          { key: "", value: [""] },
        ]);
      }

      formik.setFieldValue(`manualQueryParameters.${index}.${field}`, newValue);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const manualQueryParameters = [...formik.values.manualQueryParameters];
    manualQueryParameters[index].isChecked =
      !manualQueryParameters[index].isChecked; // Toggle the checked state
    formik.setFieldValue("manualQueryParameters", manualQueryParameters); // Update formik state with new headers
  };
  const addValueTextField = (index: number, valueArray: string[]) => {
    formik.setFieldValue(`manualQueryParameters.${index}.value`, [
      ...valueArray,
      "",
    ]);
  };

  const deleteValueTextField = (index: number, valIndex: number) => {
    const newValueArray = formik.values.manualQueryParameters[
      index
    ].value.filter((val: string, i: number) => i !== valIndex);
    formik.setFieldValue(`manualQueryParameters.${index}.value`, newValueArray);
  };

  return (
    <Table>
      <TableBody>
        {formik.values.manualQueryParameters.map((param, index) => (
          <TableRow
            key={index}
            sx={{
              verticalAlign: "middle",
              "&:hover .delete-icon": {
                visibility: "visible",
              },
            }}
          >
            <TableCell
              sx={{ borderBottom: "none", width: "24px", verticalAlign: "top" }}
            >
              <Checkbox
                checked={
                  param.key !== "" &&
                  param.value.some((x) => x !== "") &&
                  param.isChecked
                }
                onChange={() => handleCheckboxChange(index)}
                sx={{
                  color: "#FFFFFF",
                  padding: 0,
                  paddingTop: "8px",
                  "&.Mui-checked": {
                    color: "#FFFFFF",
                  },
                }}
              />
            </TableCell>
            <TableCell sx={{ borderBottom: "none", verticalAlign: "top" }}>
              <OutlinedInput
                value={`${formik.values.manualQueryParameters[index].key}`}
                id={`manualQueryParameters.${index}.key`}
                name={`manualQueryParameters.${index}.key`}
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
            {param.value.map((val, valIndex) => (
              <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                <TableCell
                  key={valIndex}
                  sx={{
                    borderBottom: "none",
                    "&:hover .delete-value-icon": {
                      visibility: "visible",
                    },
                  }}
                >
                  <OutlinedInput
                    value={val}
                    id={`manualQueryParameters.${index}.value.${valIndex}`}
                    name={`manualQueryParameters.${index}.value.${valIndex}`}
                    sx={{
                      height: "40px",
                      border: "2px solid #2b2b2b",
                      "& .MuiInputBase-input": {
                        color: "#FFF",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "gray",
                        opacity: 1,
                      },
                    }}
                    onChange={(e) =>
                      handleInputChange(e, index, `value.${valIndex}`)
                    }
                    endAdornment={
                      valIndex === 0 ? (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{ color: "gray" }}
                            size="small"
                            onClick={() =>
                              addValueTextField(index, param.value)
                            }
                          >
                            <AddCircleOutline />
                          </IconButton>
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          <IconButton
                            className="delete-value-icon"
                            sx={{
                              color: "gray",
                              cursor: "pointer",
                              fontSize: 20,
                              visibility: "hidden",
                            }}
                            size="small"
                            onClick={() =>
                              deleteValueTextField(index, valIndex)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                    placeholder="Value"
                    fullWidth
                  />
                </TableCell>
              </Box>
            ))}
            <TableCell
              sx={{ borderBottom: "none", padding: 0, verticalAlign: "top" }}
            >
              {formik.values.manualQueryParameters.length > 1 && (
                <Delete
                  className="delete-icon"
                  sx={{
                    cursor: "pointer",
                    color: "gray",
                    fontSize: 20,
                    visibility: "hidden",
                    paddingTop: "24px",
                  }}
                  onClick={() => deleteManualQueryParameter(index)}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManualParamsComponent;
