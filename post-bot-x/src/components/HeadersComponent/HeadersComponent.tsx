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

const HeadersComponent = () => {
  const { formik } = useAPITestFormikContext();
  const [rowAddedFlags, setRowAddedFlags] = useState<boolean[]>([]);

  const resetRowFlags = () => {
    setRowAddedFlags(
      new Array(formik.values.queryParameters.length).fill(false)
    );
  };

  const deleteHeader = (i: number) => {
    if (formik.values.headerPairs.length === 1) {
      formik.setFieldValue("headerPairs", formik.initialValues.headerPairs);
      resetRowFlags();
    } else {
      const headerParams = formik.values.headerPairs.filter(
        (
          header: {
            key: string;
            value: string;
          },
          index
        ) => index !== i
      );
      formik.setFieldValue("headerPairs", headerParams);
      resetRowFlags();
    }
  };

  return (
    <Table>
      <TableBody>
        {formik.values.headerPairs.map(
          (header: { key: string; value: string }, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <OutlinedInput
                  value={`${formik.values.headerPairs[index].key}`}
                  id={`headerPairs.${index}.key`}
                  name={`headerPairs.${index}.key`}
                  sx={{
                    height: "40px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "blue",
                      },
                      "&:hover fieldset": {
                        borderColor: "gray",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "red",
                      },
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
                    formik.setFieldValue(
                      `headerPairs.${index}.key`,
                      e.target.value
                    );
                    if (
                      index === formik.values.headerPairs.length - 1 &&
                      !rowAddedFlags[index] &&
                      e.target.value
                    ) {
                      console.log("if condition called");
                      setRowAddedFlags((prevFlags) => {
                        const updatedFlags = [...prevFlags];
                        updatedFlags[index] = true;
                        return updatedFlags;
                      });
                      formik.setFieldValue("headerPairs", [
                        ...formik.values.headerPairs,
                        { key: "", value: "" },
                      ]);
                    }
                  }}
                  placeholder="Key"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <OutlinedInput
                  value={`${formik.values.headerPairs[index].value}`}
                  id={`headerPairs.${index}.value`}
                  name={`headerPairs.${index}.value`}
                  sx={{
                    height: "40px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "blue",
                      },
                      "&:hover fieldset": {
                        borderColor: "gray",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "red",
                      },
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
                    formik.setFieldValue(
                      `headerPairs.${index}.value`,
                      e.target.value
                    );
                    if (
                      index === formik.values.headerPairs.length - 1 &&
                      !rowAddedFlags[index] &&
                      e.target.value
                    ) {
                      setRowAddedFlags((prevFlags) => {
                        const updatedFlags = [...prevFlags];
                        updatedFlags[index] = true;
                        return updatedFlags;
                      });
                      formik.setFieldValue("headerPairs", [
                        ...formik.values.headerPairs,
                        { key: "", value: "" },
                      ]);
                    }
                  }}
                  placeholder="Value"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                {formik.values.headerPairs.length > 1 && (
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
