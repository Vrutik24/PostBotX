import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  fontWeight:"bold",
  color: "#4CAF50", // Light green for title
  letterSpacing: "4px",
}));
