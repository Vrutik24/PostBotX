import { Box, Paper, Typography } from "@mui/material";
import "./selectAPITestingMode.css";
import { useNavigate } from "react-router-dom";

const SelectAPITestingMode = () => {
  const navigateTo = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        display: "flex",
      }}
      className="body"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          width: "fit-content",
          padding: "40px",
          gap: "50px",
          margin: "auto",
          textAlign: "center",
        }}
        className="bodyContainer"
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "60px", fontWeight: 900, color: "green" }}
          // className="api-typography"
        >
          How do you want to test your api?
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            gap: "50px",
          }}
          className="testModeContainer"
        >
          <Paper
            sx={{
              width: "300px",
              height: "170px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "inherit",
              border: "3px solid green",
              color: "green",
              paddingX: "10px",
              cursor: "pointer",
            }}
            elevation={3}
            onClick = {() => navigateTo("/api-testing/automated-testing")}
          >
            <Typography variant="h6" fontWeight={900}>
              Automated Testing
            </Typography>
          </Paper>
          <Paper
            sx={{
              width: "300px",
              height: "170px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "inherit",
              border: "3px solid green",
              color: "green",
              paddingX: "10px",
              cursor: "pointer",
            }}
            elevation={3}
            onClick = {() => navigateTo("/api-testing/manual-testing")}
          >
            <Typography variant="h6" fontWeight={900}>
              Manual Testing
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectAPITestingMode;
