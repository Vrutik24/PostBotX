import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";

// Home Page

export const HomePage = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundColor: "black",
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
  color: "green",
  letterSpacing: "10px",
}));

export const MainButton = styled(Button)(({ theme }) => ({
  backgroundColor: "green",
  color: "white",
  width: "fit-content",
  height: "fit-content",
  padding: "15px",
  borderRadius: "20px",
  cursor: "pointer",
}));

// Feture Page

export const FeaturePage = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundColor: "black",
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
  backgroundColor: "inherit",
  border: "3px solid green",
  color: "green",
  paddingX: "10px",
  margin: 'auto'
}));
