import { styled } from "@mui/material/styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export const SignInPage = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  backgroundColor: '#151414', // Dark background
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
  "& .MuiInputBase-root": {
    color: "#4CAF50", // Light grey text color for input
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4CAF50", 
    },
    "&:hover fieldset": {
      borderColor: "#4ee324", 
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4ee324", 
    },
  },
  "& .MuiInputLabel-root": {
    color: "#4CAF50", 
  },
}));

export const SignInButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: "#4CAF50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1f911f", 
  },
}));

export const CreateAccountButton = styled(Button)(({ theme }) => ({
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

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));