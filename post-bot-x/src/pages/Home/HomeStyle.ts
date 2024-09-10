import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Login } from "@mui/icons-material"; // Import Login icon

export const HomePage = styled(Box)(({ theme }) => ({
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

export const HomeContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  maxWidth: "80%",
  margin: "0 auto",
}));

export const HomeTitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "56px",
  color: "#4CAF50", // Light green for title
  letterSpacing: "10px",
}));

export const MainButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4CAF50", // Light green for button
  color: "white",
  width: "fit-content",
  height: "fit-content",
  padding: "15px",
  borderRadius: "20px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#006400",
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: "#455a53",
  fontSize: "22px",
  textAlign: "center",
  marginTop: "30px",
  maxWidth: "100%",
  lineHeight: "1.5",
}));

// Feature Page

export const FeaturePage = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 100px)",
  width: "100%",
  backgroundColor: "#151414",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const FeatureContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  padding: "20px",
  maxWidth: "1200px",
}));

export const FeatureContentPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1d1c1c",
  color: "#4CAF50",
  padding: "50px",
}));
