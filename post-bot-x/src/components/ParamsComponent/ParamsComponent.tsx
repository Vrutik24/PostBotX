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
    if (formik.values.queryParameters.length === 1) {
      formik.setFieldValue(
        "queryParameters",
        formik.initialValues.queryParameters
      );
      resetRowFlags();
    } else {
      const newQueryParameters = formik.values.queryParameters.filter(
        (
          queryParameter: QueryParameter,
          index
        ) => index !== i
      );
      formik.setFieldValue("queryParameters", newQueryParameters);
      resetRowFlags();
    }
  };

  return (
    <Table>
      <TableBody>
        {formik.values.queryParameters?.map(
          (param: { key: string; value: string[] }, index: number) => (
            <TableRow key={index}>
              <TableCell sx={{ borderBottom: "none" }}>
                <OutlinedInput
                  value={`${formik.values.queryParameters[index].key}`}
                  id={`queryParameters.${index}.key`}
                  name={`queryParameters.${index}.key`}
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
                  onChange={(e) => {
                    console.log("e", e.target.value);
                    if (
                      index === formik.values.queryParameters.length - 1 &&
                      !rowAddedFlags[index] &&
                      e.target.value
                    ) {
                      setRowAddedFlags((prevFlags) => {
                        const updatedFlags = [...prevFlags];
                        updatedFlags[index] = true;
                        return updatedFlags;
                      });
                      formik.setFieldValue("queryParameters", [
                        ...formik.values.queryParameters,
                        { key: "", value: [""] },
                      ]);
                    }
                    formik.setFieldValue(
                      `queryParameters.${index}.key`,
                      e.target.value
                    );
                  }}
                  placeholder="Key"
                  fullWidth
                />
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <OutlinedInput
                  value={`${formik.values.queryParameters[index].value[0]}`}
                  id={`queryParameters.${index}.value.0`}
                  name={`queryParameters.${index}.value.0`}
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
                  onChange={(e) => {
                    if (
                      index === formik.values.queryParameters.length - 1 &&
                      !rowAddedFlags[index] &&
                      e.target.value
                    ) {
                      setRowAddedFlags((prevFlags) => {
                        const updatedFlags = [...prevFlags];
                        updatedFlags[index] = true;
                        return updatedFlags;
                      });
                      formik.setFieldValue("queryParameters", [
                        ...formik.values.queryParameters,
                        { key: "", value: [""] },
                      ]);
                    }
                    formik.setFieldValue(
                      `queryParameters.${index}.value.0`,
                      e.target.value
                    );
                  }}
                  placeholder="Value"
                  fullWidth
                />
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                {formik.values.queryParameters.length > 1 && (
                  <Delete
                    sx={{ cursor: "pointer", color: "gray" }}
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
