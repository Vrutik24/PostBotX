import { styled } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const SignInPage = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  backgroundColor: "#151414", // Dark background
  overflow: "hidden", // Prevent scrolling
  position: "relative", // To position the login icon absolutely
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const SignInBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  width: "100%",
  margin: "0 auto",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  "& .MuiFormLabel-root": {
    color: "#b1b5ac",
    "&.Mui-error, &.Mui-focused": {
      color: "#b1b5ac", // Label color on error and focus
    },
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiFormHelperText-root": {
    color: "#9c2406",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#b1b5ac", // Default border color
    },
    "&.Mui-focused fieldset, &.Mui-error:not(.Mui-focused) fieldset, &:hover:not(.Mui-focused) fieldset":
      {
        borderColor: "#b1b5ac", // Error state border color (same as default to prevent red border)
      },
    "&.Mui-error fieldset": {
      borderColor: "#b1b5ac", // Error state border color (same as default to prevent red border)
    },
  },
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: "#4CAF50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "darkgreen",
  },
}));

export const CreateAccountButton = styled(Button)(({ theme }) => ({
  color: "#4CAF50", // Light green
  "&:hover": {
    backgroundColor: "#212121",
  },
}));

export const LogoImage = styled("img")(({ theme }) => ({
  cursor: "pointer",
  marginBottom: theme.spacing(4),
  maxWidth: "150px",
  display: "block",
  margin: "0 auto",
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: "#b1b5ac",
  width: "300px",
  margin: `${theme.spacing(2)} auto`,
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  backgroundColor: "#D32F2F10",
  border: "1px solid #D32F2F",
  borderRadius: "8px",
  alignItems: "center",
  justifyContent: "space-between",
  display: "flex",
}));
