import { styled } from "@mui/material/styles";
import { Box, Typography, Avatar as MUIAvatar, Button } from "@mui/material";

// Styled components
export const UserBox = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "50px",
  display: "flex",
  justifyContent: "flex-start",
  color: "#63a626", // green
}));

export const UserContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginRight: "20px",
}));

export const UserOption = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
}));

export const Avatar = styled(MUIAvatar)(({ theme }) => ({
  backgroundColor: "#63a626", // green
  color: "#fff",
  width: 40,
  height: 40,
  fontSize: "1rem",
  cursor: "pointer",
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#7ed33b", // light green
  color: "#040719", // black
  marginTop: theme.spacing(2),
}));
