import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const APITestingPage = styled(Box)(({ theme }) => ({
  backgroundColor: "rgb(29 28 28)",
  height: "100vh",
  width: "calc(100vw - 350px)",
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  height: "calc(100% - 50px)",
  //width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "20px 30px 20px 20px",
}));

export const CollectionInfoBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  //margin: '30px auto 0px',
  color: "white",
}));

export const HeaderContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  //margin: "20px auto 20px",
  //marginLeft: 'auto',
  //marginRight:'auto',
  height: "50px",
  padding: "5px",
  backgroundColor: "#151414",
  border: "none",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

export const BodyContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "calc(100% - 50px)",
  backgroundColor: "#151414",
  border: "none",
  borderRadius: "10px",
  padding: "5px",
  //margin: "0px auto 20px",
  overflowY: "auto",
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
