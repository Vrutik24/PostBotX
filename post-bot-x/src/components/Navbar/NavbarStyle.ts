import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const NavbarBox = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "100vw",
  display: "flex",
  justifyContent: "flex-end",
  color: "green",
}));

export const NavbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginRight: "20px",
}));

export const NavbarOption = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
}));
