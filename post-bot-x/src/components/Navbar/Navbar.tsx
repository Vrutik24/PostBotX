import { Launch } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import NavbarStyles from "./navbar-style";

const Navbar = () => {
  const classes = NavbarStyles();
  return (
    <Box
      // className={classes.navbar}
      sx={{
        height: "50px",
        width: "100vw",
        display: "flex",
        justifyContent: "flex-end",
        color: "green",
      }}
    >
      <Box
        // className={classes.navbarContent}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginRight: "20px",
        }}
      >
        <Typography sx={{cursor: "pointer"}}>Home</Typography>
        <Typography sx={{cursor: "pointer"}}>Features</Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
