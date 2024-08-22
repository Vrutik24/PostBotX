import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CollectionNavbar from "../../components/Collection/CollectionNavbar";

const ApiTesting = () => {
  return (
    <Box display={"flex"}>
      <CollectionNavbar />
      <Outlet />
    </Box>
  );
};

export default ApiTesting;
//Asif
