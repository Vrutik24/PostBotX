import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const APITestingPage = styled(Box)(({ theme }) => ({
  backgroundColor: "black",
  height: "100vh",
  width: "calc(100vw - 350px)",
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

export const CollectionInfoBox = styled(Box)(({theme}) => ({
  width: "90%",
  display:'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '30px auto 0px',
  color:'white'
}))

export const HeaderContentBox = styled(Box)(({ theme }) => ({
  width: "90%",
  margin: "20px auto 20px",
  marginLeft: 'auto',
  marginRight:'auto',
  height: '50px',
  padding: "5px",
  backgroundColor: "inherit",
  border: "1px solid grey",
  display: 'flex',
  alignItems:'center',
  gap: '10px'
}));

export const BodyContentBox = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "calc(100% - 50px)",
  backgroundColor: "inherit",
  border: "1px solid grey",
  borderRadius: "10px",
  padding: "5px",
  margin: "0px auto 20px",
  overflowY: 'auto'
}));
