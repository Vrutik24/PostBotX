import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import {
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { Header } from "../../types";

const HeadersComponent = () => {
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

  return (
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
                      color: "#FFA24E",
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
  );
};

export default HeadersComponent;
