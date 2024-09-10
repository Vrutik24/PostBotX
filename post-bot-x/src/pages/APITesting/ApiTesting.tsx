import { useState } from "react";
import { Box } from "@mui/material";
import CollectionNavbar from "../../components/Collection/CollectionNavbar";
import AutomatedTesting from "../AutomatedTesting/AutomatedTesting";
import { APITestFormikProvider } from "../../contexts/APITestFormikContext";

const ApiTesting = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <APITestFormikProvider>
      <Box display={"flex"}>
        <CollectionNavbar setIsResponseVisible={setIsVisible} />
        <AutomatedTesting isVisible={isVisible} setIsVisible={setIsVisible} />
      </Box>
    </APITestFormikProvider>
  );
};

export default ApiTesting;