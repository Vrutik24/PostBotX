import {
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";

type DynamicParamsTableProps = {
  items: { key: string; value: string[] | string }[];
  onValueChange: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
  addNewItem: () => void;
  showAddButton?: boolean;
  showDeleteButton: boolean;
  placeholder: { key: string; value: string };
  valueType: "single" | "multiple";
};

const DynamicParamsTable: React.FC<DynamicParamsTableProps> = ({
  items,
  onValueChange,
  onDelete,
  addNewItem,
  showAddButton,
  showDeleteButton,
  placeholder,
  valueType,
}) => {
  const [rowAddedFlags, setRowAddedFlags] = useState<boolean[]>([]);

  const resetRowFlags = () => {
    setRowAddedFlags(new Array(items.length).fill(false));
  };

  const handleDelete = (index: number) => {
    console.log("deleet index: ", index);
    onDelete(index);
    resetRowFlags();
  };

  const isEmptyRow = (item: { key: string; value: string[] | string }) => {
    return (
      item.key === "" &&
      (Array.isArray(item.value)
        ? (item.value as string[]).every((val) => val === "")
        : item.value === "")
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string
  ) => {
    
    const updatedItem = {
      ...items[index],
      [field === "key" ? "key" : "value"]: e.target.value,
    };

    if (
      isEmptyRow(updatedItem) &&
      index !== items.length - 1
    ) {
      handleDelete(index);
    } else if (index === items.length - 1 && !rowAddedFlags[index] && e.target.value) {
      setRowAddedFlags((prevFlags) => {
        const updatedFlags = [...prevFlags];
        updatedFlags[index] = true;
        return updatedFlags;
      });
      addNewItem();
    }
    
    onValueChange(index, field, e.target.value);
  };

  return (
    <Table>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index} sx={{ verticalAlign: "top" }}>
            <TableCell sx={{ borderBottom: "none" }}>
              <OutlinedInput
                value={item.key}
                id={`item.${index}.key`}
                name={`item.${index}.key`}
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
                onChange={(e) => handleChange(e, index, "key")}
                placeholder={placeholder.key}
                fullWidth
              />
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
              <OutlinedInput
                value={item.value}
                id={`item.${index}.value.0`}
                name={`item.${index}.value.0`}
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
                onChange={(e) => handleChange(e, index, "value.0")}
                placeholder={placeholder.value}
                fullWidth
              />
            </TableCell>
            {showDeleteButton && (
              <TableCell sx={{ borderBottom: "none" }}>
                {items.length > 1 &&
                  !(index === items.length - 1 && isEmptyRow(item)) && (
                    <Delete
                      sx={{ cursor: "pointer", color: "gray" }}
                      onClick={() => handleDelete(index)}
                    />
                  )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicParamsTable;
