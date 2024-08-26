import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";

export const HomePage = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundColor: "#040719", 
}));

export const HomeContent = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100% - 50px)",
  display: "flex",
}));

export const HomeTitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  margin: "auto",
  justifyContent: "center",
  alignItems: "center",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "56px",
  color: "#63a626", // Updated color
  letterSpacing: "10px",
}));

export const MainButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#63a626", // Updated color
  color: "white",
  width: "fit-content",
  height: "fit-content",
  padding: "15px",
  borderRadius: "20px",
  cursor: "pointer",
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: "#63a626",
  fontSize: "22px",
  textAlign: "center",
  marginTop: "30px", // Added space between button and description
  maxWidth: "80%",
  margin: "auto",
  lineHeight: "1.5",
}));

// Feature Page

export const FeaturePage = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundColor: "#040719", // Updated color
  display: "flex",
}));

export const FeatureContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "40px",
  margin: "auto",
}));

export const FeatureContentPaper = styled(Paper)(({ theme }) => ({
  width: "300px",
  height: "170px",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#040719", // Updated color
  border: `3px solid #63a626`, // Updated color
  color: "#63a626", // Updated color
  paddingX: "10px",
  margin: 'auto'
}));
