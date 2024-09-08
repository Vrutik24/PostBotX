import { styled } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const SignUpPage = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  backgroundColor: "#151414", // Dark background
  overflow: "hidden", // Prevent scrolling
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const SignUpBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  width: "100%",
  margin: "0 auto",
}));

export const SignUpForm = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  maxWidth: "400px",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#9a9e96", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#b1b5ac", // Hover state border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "#b1b5ac", // Focus state border color
    },
    "&.Mui-error fieldset": {
      borderColor: "#9a9e96", // Error state border color (same as default to prevent red border)
    },
  },
  "& .MuiInputLabel-root": {
    color: "#b1b5ac", // Label color
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#9c2406", // Error message text color
  },
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
    backgroundColor: "#1f911f",
  },
}));

export const AlreadyAccountButton = styled(Button)(({ theme }) => ({
  color: "#7ed33b", // Light green
  marginTop: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#3a3d3a",
  },
}));

export const LogoImage = styled("img")(({ theme }) => ({
  cursor: "pointer",
  marginBottom: theme.spacing(4),
  maxWidth: "150px",
  display: "block",
  margin: "0 auto",
}));
