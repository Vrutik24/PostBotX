import { Box } from "@mui/material";
import CollectionNavbar from "../../components/Collection/CollectionNavbar";
import AutomatedTesting from "../AutomatedTesting/AutomatedTesting";
import { APITestFormikProvider } from "../../contexts/APITestFormikContext";

const ApiTesting = () => {
  return (
    <APITestFormikProvider>
      <Box display={"flex"}>
        <CollectionNavbar />
        <AutomatedTesting />
      </Box>
    </APITestFormikProvider>
  );
};

export default ApiTesting;
