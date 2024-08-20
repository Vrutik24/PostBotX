import { Launch } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      style={{
        height: "50px",
        width: "100vw",
        display: "flex",
        justifyContent: "flex-end",
        color: "green",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginRight: "20px",
        }}
      >
        <Typography sx={{ cursor: "pointer" }}>Home</Typography>
        <Typography sx={{ cursor: "pointer" }}>Features</Typography>
        <Button
          variant="contained"
          endIcon={<Launch />}
          style={{
            backgroundColor: "green",
            color: "white",
            width: "fit-content",
            height: "fit-content",
            padding: "5px",
            paddingRight: "10px",
            paddingLeft: "10px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Get Started
        </Button>
        {/* <Typography>Get Started</Typography> */}
      </Box>
    </Box>
  );
};

export default Navbar;
