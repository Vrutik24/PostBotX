import { Box } from "@mui/material";
import CollectionNavbar from "../../components/Collection/CollectionNavbar";
import AutomatedTesting from "../AutomatedTesting/AutomatedTesting";

const ApiTesting = () => {
  return (
    <Box display={"flex"}>
      <CollectionNavbar />
      <AutomatedTesting />
    </Box>
  );
};

export default ApiTesting;

