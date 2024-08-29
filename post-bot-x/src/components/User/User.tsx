import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import {
  UserBox,
  UserContainer,
  UserOption,
  Avatar,
  NotificationItem,
  NotificationList,
  LogoutButton,
} from "./UserStyle";
import { Popover, Typography, Box, IconButton } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useCollection } from "../../contexts/CollectionContext";
import { Notification } from "../../types";

const Userbar = () => {
  const { currentUser, logOut } = useAuth();
  const { getAllNotification } = useNotification();
  const { acceptCollectionRequest, denyCollectionRequest } = useCollection();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        const fetchedNotifications = await getAllNotification();
        if (fetchedNotifications) {
          setNotifications(fetchedNotifications);
        }
      }
    };

    if (anchorEl) {
      fetchNotifications();
    }
  }, [anchorEl, currentUser, getAllNotification]);

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/signin");
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = async (
    notificationId?: string,
    collectionId?: string
  ) => {

    console.log("notification  >>> " + notificationId);
    console.log("collectionId  >>> " + collectionId);
    if (!notificationId || !collectionId) {
      return;
    }
    await acceptCollectionRequest(collectionId);
    await denyCollectionRequest(notificationId);
    setNotifications(
      notifications.filter((notification) => notification.id !== collectionId)
    );
  };

  const handleDeny = async (notificationId?: string) => {
    if (!notificationId) {
      return;
    }
    await denyCollectionRequest(notificationId);
    setNotifications(
      notifications.filter((notification) => notification.id !== notificationId)
    );
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
                <NotificationList>
                  {notifications?.map((notification: Notification) => (
                    <NotificationItem key={notification.collectionId}>
                      <Typography variant="body2">
                        {notification.senderName} shared the collection 
                        {notification.collectionName}
                      </Typography>
                      <Box display="flex" justifyContent="space-between" mt={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            handleAccept(
                              notification.id,
                              notification.collectionId
                            )
                          }
                        >
                          <Check />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => handleDeny(notification.id)}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    </NotificationItem>
                  ))}
                </NotificationList>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
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
