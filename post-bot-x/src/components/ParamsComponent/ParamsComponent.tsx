import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import {
  Checkbox,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { QueryParameter } from "../../types/QueryParameter";

const ParamsComponent = () => {
  const { formik } = useAPITestFormikContext();
  const [rowAddedFlags, setRowAddedFlags] = useState<boolean[]>([]);

  const resetRowFlags = () => {
    setRowAddedFlags(
      new Array(formik.values.queryParameters.length).fill(false)
    );
  };

  const deleteQueryParameter = (i: number) => {
    const newQueryParameters = formik.values.queryParameters.filter(
      (_, index) => index !== i
    );
    formik.setFieldValue(
      "queryParameters",
      newQueryParameters.length
        ? newQueryParameters
        : formik.initialValues.queryParameters
    );
    resetRowFlags();
  };

  const isEmptyField = (value: string) => !value || value === "";

  const isRowEmpty = (
    queryParameters: QueryParameter[],
    index: number,
    field: "key" | "value.0",
    value: string
  ) => {
    return (
      isEmptyField(value) &&
      (field === "key"
        ? isEmptyField(queryParameters[index].value[0])
        : isEmptyField(queryParameters[index].key))
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: "key" | "value.0"
  ) => {
    const { queryParameters } = formik.values;
    const isLastRow = index === queryParameters.length - 1;
    const newValue = e.target.value;

    // Check if the key or value is empty and uncheck the checkbox if true
    if (field === "key" && isEmptyField(newValue)) {
      queryParameters[index].isChecked = false;
    } else if (field === "value.0" && isEmptyField(newValue)) {
      queryParameters[index].isChecked = false;
    } else {
      // If both fields are filled, you may want to ensure the checkbox is checked
      queryParameters[index].isChecked = true;
    }

    if (isRowEmpty(queryParameters, index, field, newValue) && !isLastRow) {
      deleteQueryParameter(index);
    } else {
      if (
        isLastRow &&
        !rowAddedFlags[index] &&
        (queryParameters[index].key || newValue)
      ) {
        setRowAddedFlags((prevFlags) => {
          const updatedFlags = [...prevFlags];
          updatedFlags[index] = true;
          return updatedFlags;
        });
        formik.setFieldValue("queryParameters", [
          ...queryParameters,
          { key: "", value: [""] },
        ]);
      }

      formik.setFieldValue(`queryParameters.${index}.${field}`, newValue);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const queryParameters = [...formik.values.queryParameters];
    queryParameters[index].isChecked = !queryParameters[index].isChecked; // Toggle the checked state
    formik.setFieldValue("queryParameters", queryParameters); // Update formik state with new headers
  };

  return (
    <Table>
      <TableBody>
        {formik.values.queryParameters?.map(
          (
            param: { key: string; value: string[]; isChecked: boolean },
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
                    param.key !== "" && param.value[0] !== "" && param.isChecked
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
                  value={param.key}
                  id={`queryParameters.${index}.key`}
                  name={`queryParameters.${index}.key`}
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
                  value={param.value[0]}
                  id={`queryParameters.${index}.value.0`}
                  name={`queryParameters.${index}.value.0`}
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
                  onChange={(e) => handleInputChange(e, index, "value.0")}
                  placeholder="Value"
                  fullWidth
                />
              </TableCell>
              <TableCell sx={{ borderBottom: "none", padding: 0 }}>
                {formik.values.queryParameters.length > 1 &&
                  !(
                    index === formik.values.queryParameters.length - 1 &&
                    isEmptyField(param.key) &&
                    isEmptyField(param.value[0])
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
                        deleteQueryParameter(index);
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

export default ParamsComponent;
