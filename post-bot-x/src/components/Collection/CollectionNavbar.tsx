import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CollectionNavbar = () => {
  const navigateTo = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "350px",
        padding: "20px",
        backgroundColor: "black",
        borderRight: "2px solid grey",
      }}
    >
      <Typography
        //   className="mainTitleTypography"
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "green",
          letterSpacing: "5px",
          textAlign: "center",
          cursor: 'pointer'
        }}
        onClick = {() => navigateTo("/")}
      >
        PostBotX
      </Typography>
      <Button
        variant="contained"
        sx={{ marginTop: "20px", backgroundColor: "green", width: "100%" }}
      >
        Add Collection
      </Button>
    </Box>
  );
};

export default CollectionNavbar;
