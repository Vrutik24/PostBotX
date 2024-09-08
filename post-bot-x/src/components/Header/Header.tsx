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
      justifyContent="flex-end"
      width="100%"
      sx={{
        position: "absolute",
        top: 12,
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <Box display="flex" alignItems="center" gap={1} sx={{ marginRight: 2 }}>
        {currentUser && <Notification />}
        <User />
      </Box>
    </Box>
  );
};

export default Header;
