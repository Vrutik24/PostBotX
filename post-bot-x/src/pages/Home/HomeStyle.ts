import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Login } from "@mui/icons-material"; // Import Login icon

export const HomePage = styled(Box)(({ theme }) => ({
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
}));

export const Description = styled(Typography)(({ theme }) => ({
  color: "#535a53", // Grey for description
  fontSize: "22px",
  textAlign: "center",
  marginTop: "30px",
  maxWidth: "100%", // Ensure it fits within the container
  lineHeight: "1.5",
}));

// Feature Page

export const FeaturePage = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 100px)", // Adjust height to fit within viewport
  width: "100%", // Changed from 100vw to 100%
  backgroundColor: '#151414', // Dark background
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
  backgroundColor: '#151414', // Dark background for feature cards
  border: `3px solid #4CAF50`, // Light green border
  color: "#4CAF50", // Light green text
  padding: "20px",
}));
