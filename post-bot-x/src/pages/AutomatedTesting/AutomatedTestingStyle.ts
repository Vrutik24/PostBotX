import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const APITestingPage = styled(Box)(({ theme }) => ({
  backgroundColor: "black",
  height: "100vh",
  width: "calc(100vw - 350px)",
  padding: "20px",
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

export const HeaderContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "50px",
  backgroundColor: "inherit",
  border: "1px solid grey",
  borderRadius: "10px",
  padding: "5px",
}));

export const BodyContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100% - 50px)",
  backgroundColor: "inherit",
  border: "1px solid grey",
  borderRadius: "10px",
  padding: "5px",
}));