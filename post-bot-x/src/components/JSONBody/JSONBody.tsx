import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const JSONBody = () => {
  const [jsonInput, setJsonInput] = useState("");
  const handleInputChange = (e: any) => {
    setJsonInput(e.target.value);
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <TextField
        multiline
        variant="outlined"
        fullWidth
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='{"key": "value"}'
        sx={{
          "& .MuiInputBase-input": {
            color: "rgba(255, 255, 255, 0.87)",
            fontSize: "14px",
            fontWeight: "100",
            letterSpacing: "2px",
            opacity: 1,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "green",
          color: "white",
          position: "sticky",
          bottom: "0px",
        }}
      >
        Configure Json Object
      </Button>
    </Box>
  );
};

export default JSONBody;
