import { styled } from "@mui/material/styles";
import { Box, Typography, Avatar as MUIAvatar, Button } from "@mui/material";

// Styled components
export const UserBox = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "50px",
  display: "flex",
  justifyContent: "flex-end",
  color: "#4CAF50", // green
}));

export const UserContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: "auto",
}));

export const UserOption = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
}));

export const Avatar = styled(MUIAvatar)(({ theme }) => ({
  backgroundColor: "#4CAF50", // green
  color: "#fff",
  width: 40,
  height: 40,
  fontSize: "1rem",
  cursor: "pointer",
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#e53935", 
  color: "#ffffff", 
  marginTop: theme.spacing(2),
  '&:hover': {
    backgroundColor: "#b71c1c", 
  },
}));

