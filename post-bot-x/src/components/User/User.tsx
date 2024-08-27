import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserBox, UserContainer, UserOption, Avatar } from "./UserStyle";
import { Popover, Typography, Button, Box } from "@mui/material";

const Userbar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/signin");
    setAnchorEl(null); // Close the popover after logout
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserInitials = () => {
    if (currentUser?.displayName) {
      const nameParts = currentUser.displayName.split(" ");
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    return "";
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <UserBox>
      <UserContainer>
        {currentUser ? (
          <>
            <Avatar onClick={handleAvatarClick}>{getUserInitials()}</Avatar>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box
                p={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  {currentUser.displayName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentUser.email}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                  sx={{ mt: 2 }}
                >
                  Logout
                </Button>
              </Box>
            </Popover>
          </>
        ) : (
          <UserOption onClick={handleLoginClick}>Login</UserOption>
        )}
      </UserContainer>
    </UserBox>
  );
};

export default Userbar;
