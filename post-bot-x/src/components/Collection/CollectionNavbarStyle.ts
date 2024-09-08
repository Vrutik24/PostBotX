import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const CollectionNavbarBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "350px",
  // padding: "20px",
  backgroundColor: "#151414",
  borderRight: "none",
}));

export const CollectionNavbarContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
}));

export const CollectionNavbarTitle = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "bold",
  color: "#4CAF50",
  letterSpacing: "5px",
  textAlign: "center",
  cursor: "pointer",
}));

export const AddCollectionButton = styled(Button)(({ theme }) => ({
  marginTop: "20px",
  backgroundColor: "#4CAF50",
  width: "100%",
  "&:hover": {
    backgroundColor: "#006400",
  },
}));

export const CollectionBoxContainer = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  overflowY: "auto",
  height: "calc(100vh - 170px)",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
}));
