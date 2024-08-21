import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const AutomatedTesting = () => {
  const handleChange = () => {};
  return (
    <Box
      sx={{
        backgroundColor: "black",
        height: "100vh",
        width: "calc(100vw - 350px)",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50px",
            backgroundColor: "inherit",
            border: "1px solid grey",
            borderRadius: "10px",
            padding: "5px",
          }}
        ></Box>
        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 50px)",
            backgroundColor: "inherit",
            border: "1px solid grey",
            borderRadius: "10px",
            padding: "5px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default AutomatedTesting;
