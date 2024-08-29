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
    if (formik.values.headers.length === 1) {
      formik.setFieldValue("headers", formik.initialValues.headers);
      resetRowFlags();
    } else {
      const headerParams = formik.values.headers.filter(
        (
          header: Header,
          index
        ) => index !== i
      );
      formik.setFieldValue("headers", headerParams);
      resetRowFlags();
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
                  value={`${formik.values.headers[index].key}`}
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
                  onChange={(e) => {
                    if (
                      index === formik.values.headers.length - 1 &&
                      !rowAddedFlags[index] &&
                      e.target.value
                    ) {
                      console.log("if condition called");
                      setRowAddedFlags((prevFlags) => {
                        const updatedFlags = [...prevFlags];
                        updatedFlags[index] = true;
                        return updatedFlags;
                      });
                      formik.setFieldValue("headers", [
                        ...formik.values.headers,
                        { key: "", value: "" },
                      ]);
                    }
                    formik.setFieldValue(
                      `headers.${index}.key`,
                      e.target.value
                    );
                  }}
                  placeholder="Key"
                  fullWidth
                />
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <OutlinedInput
                  value={`${formik.values.headers[index].value}`}
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
                  onChange={(e) => {
                    if (
                      index === formik.values.headers.length - 1 &&
                      !rowAddedFlags[index] &&
                      e.target.value
                    ) {
                      setRowAddedFlags((prevFlags) => {
                        const updatedFlags = [...prevFlags];
                        updatedFlags[index] = true;
                        return updatedFlags;
                      });
                      formik.setFieldValue("headers", [
                        ...formik.values.headers,
                        { key: "", value: "" },
                      ]);
                    }
                    formik.setFieldValue(
                      `headers.${index}.value`,
                      e.target.value
                    );
                  }}
                  placeholder="Value"
                  fullWidth
                />
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                {formik.values.headers.length > 1 && (
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
