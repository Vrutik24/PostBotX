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
        (
          queryParameter: {
            key: string;
            value: string[];
          },
          index
        ) => index !== i
      );
      formik.setFieldValue("manualQueryParameters", newQueryParameters);
      resetRowFlags();
    }
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

  const handleCheckboxChange = (index: number) => {
    const manualQueryParameters = [...formik.values.manualQueryParameters];
    manualQueryParameters[index].isChecked =
      !manualQueryParameters[index].isChecked; // Toggle the checked state
    formik.setFieldValue("manualQueryParameters", manualQueryParameters); // Update formik state with new headers
  };

  return (
    <Table>
      <TableBody>
        {formik.values.manualQueryParameters.map(
          (
            param: {
              key: string;
              value: string[];
              isChecked: boolean;
            },
            index: number
          ) => (
            <TableRow
              key={index}
              sx={{
                verticalAlign: "middle",
                "&:hover .delete-icon": {
                  visibility: "visible",
                },
              }}
            >
              <TableCell sx={{ borderBottom: "none", width: "24px" }}>
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
                    "&.Mui-checked": {
                      color: "#FFFFFF",
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
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
                  onChange={(e) => {
                    if (
                      index ===
                        formik.values.manualQueryParameters.length - 1 &&
                      !rowAddedFlags[index] &&
                      e.target.value
                    ) {
                      setRowAddedFlags((prevFlags) => {
                        const updatedFlags = [...prevFlags];
                        updatedFlags[index] = true;
                        return updatedFlags;
                      });
                      formik.setFieldValue("manualQueryParameters", [
                        ...formik.values.manualQueryParameters,
                        { key: "", value: [""] },
                      ]);
                    }
                    formik.setFieldValue(
                      `manualQueryParameters.${index}.key`,
                      e.target.value
                    );
                  }}
                  placeholder="Key"
                  fullWidth
                />
              </TableCell>
              {param.value.map((val: string, valIndex: number) => (
                <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
                  <TableCell key={valIndex} sx={{ borderBottom: "none" }}>
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
                      onChange={(e) => {
                        formik.setFieldValue(
                          `manualQueryParameters.${index}.value.${valIndex}`,
                          e.target.value
                        );
                      }}
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
                              sx={{ color: "gray" }}
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
              <TableCell sx={{ borderBottom: "none", padding: 0 }}>
                {formik.values.manualQueryParameters.length > 1 && (
                  <Delete
                    className="delete-icon"
                    sx={{
                      cursor: "pointer",
                      color: "gray",
                      fontSize: 20,
                      visibility: "hidden",
                    }}
                    onClick={() => {
                      deleteManualQueryParameter(index);
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

export default ManualParamsComponent;
