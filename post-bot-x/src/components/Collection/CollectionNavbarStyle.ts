import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const CollectionNavbarBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "350px",
  padding: "20px",
  backgroundColor: "black",
  borderRight: "2px solid grey",
}));

export const CollectionNavbarTitle = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "bold",
  color: "green",
  letterSpacing: "5px",
  textAlign: "center",
  cursor: 'pointer'
}));

export const AddCollectionButton = styled(Button)(({ theme }) => ({
  marginTop: "20px", backgroundColor: "green", width: "100%"
}));
