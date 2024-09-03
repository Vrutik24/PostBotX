import { styled } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const SignUpContainer = styled(Container)(({ theme }) => ({
  maxWidth: "xs",
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const SignUpBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const SignUpForm = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: "100%", // Fixes form width
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));

export const SignUpButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: "#4CAF50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#7ed33b", // Light green
  },
}));

export const AlreadyAccountButton = styled(Button)(({ theme }) => ({
  color: "#7ed33b", // Light green
  marginTop: theme.spacing(2),
}));

export const LogoImage = styled("img")(({ theme }) => ({
  cursor: "pointer",
  marginBottom: theme.spacing(4),
  height: "150px",
  width: "130px"
}));
