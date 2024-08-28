import { styled } from "@mui/material/styles";
import { Box, Typography, Avatar as MUIAvatar, Paper } from "@mui/material";

export const UserBox = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "100vw",
  display: "flex",
  justifyContent: "flex-start",
  color: "green",
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
  backgroundColor: "#63a626",
  color: "#fff",
  width: 40,
  height: 40,
  fontSize: "1rem",
  cursor: "pointer",
}));

export const NotificationItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
