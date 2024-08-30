import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import User from "../User/User";
import Notification from "../Notification/Notification";
import { Box } from "@mui/material";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      width="100px"
      padding={2}
      gap={1} // Add gap to space items properly
    >
      <User />
      {currentUser && <Notification />}
    </Box>
  );
};

export default Header;
