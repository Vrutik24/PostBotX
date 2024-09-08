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
import { Popover, Typography, Box, Button, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ArrowForward, Login, Person } from "@mui/icons-material";

const style = {
  bgcolor: "rgb(29 28 28)",
  color: "#FFFFFF",
  boxShadow: 24,
  py: 2,
  px: 3,
  border: "none",
  borderRadius: 2,
};

interface UserPorps {
  isAnonymousUser?: boolean;
}

const User: React.FC<UserPorps> = ({ isAnonymousUser }) => {
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
              marginThreshold={8}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slotProps={{
                paper: {
                  sx: {
                    overflow: "hidden",
                    borderRadius: 2,
                    bgcolor: "#1D1C1C",
                    
                  },
                },
              }}
            >
              <Box
                p={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                color="#FFFFFF"
              >
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  {currentUser.displayName}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ color: "#FFFFFF99" }}
                >
                  {currentUser.email}
                </Typography>
                <Divider
                  sx={{
                    width: "100%",
                    my: 2,
                    backgroundColor: "#FFFFFF33",
                  }}
                />
                <Button
                  onClick={handleLogout}
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    color: "#FFFFFF",
                    backgroundColor: "#FFFFFF33",
                    textAlign: "left",
                    px: 2,
                    "&:hover": {
                      backgroundColor: "#FFFFFF50",
                    },
                  }}
                >
                  Log out
                </Button>
              </Box>
            </Popover>
          </>
        ) : (
          <UserOption onClick={handleLoginClick}>
            {isAnonymousUser ? (
              <Avatar onClick={handleAvatarClick}>
                <Person></Person>
              </Avatar>
            ) : (
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
            )}
          </UserOption>
        )}
      </UserContainer>
    </UserBox>
  );
};

export default User;
