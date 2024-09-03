import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  UserBox,
  UserContainer,
  UserOption,
  Avatar,
  LogoutButton,
} from "./UserStyle";
import { Popover, Typography, Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ArrowForward, Login } from "@mui/icons-material";

const User = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open popover on avatar click
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/signin");
    setAnchorEl(null); // Close the popover after logging out
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
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

  const open = Boolean(anchorEl); // Popover open state
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
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box
                p={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                {/* Display Name in larger and bold font */}
                <Typography variant="h6" fontWeight="bold">
                  {currentUser.displayName}
                </Typography>
                {/* Email in a smaller font */}
                <Typography variant="body2" color="textSecondary">
                  {currentUser.email}
                </Typography>
                {/* Logout Button with Logout Icon */}
                <LogoutButton
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  variant="contained"
                >
                  Logout
                </LogoutButton>
              </Box>
            </Popover>
          </>
        ) : (
          <UserOption onClick={handleLoginClick}>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: "transparent",
                color: "#4CAF50",
                padding: "10px 20px",
                borderRadius: "16px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#4CAF50",
                  color: "#151414",
                  borderRadius: "16px",
                },
              }}
            >
              Login
            </Button>
          </UserOption>
        )}
      </UserContainer>
    </UserBox>
  );
};

export default User;
