import React, { useState, useEffect } from "react";
import {
  Popover,
  Typography,
  Box,
  IconButton,
  Badge,
  Divider,
  Avatar,
} from "@mui/material";
import { useNotification } from "../../contexts/NotificationContext";
import { useCollection } from "../../contexts/CollectionContext";
import { Notification as NotificationType } from "../../types";
import {
  BellIcon,
  NotificationItem,
  NotificationList,
  NotificationContainer,
  AcceptActionButton,
  DenyActionButton,
} from "./NotificationStyle";
import { useAuth } from "../../contexts/AuthContext";

const Notification: React.FC = () => {
  const { getAllNotification } = useNotification();
  const { acceptCollectionRequest, denyCollectionRequest } = useCollection();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser.email) {
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

  const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = async (
    notificationId?: string,
    collectionId?: string
  ) => {
    if (!notificationId || !collectionId) {
      return;
    }
    await acceptCollectionRequest(collectionId);
    await denyCollectionRequest(notificationId);
    setNotifications(
      notifications.filter((notification) => notification.id !== notificationId)
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

  const getUserInitials = (senderName: string) => {
    if (senderName) {
      const nameParts = senderName.split(" ");
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return nameParts[0][0].toUpperCase();
    }
    return "";
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleBellClick} sx={{ margin: "auto" }}>
        <Badge badgeContent={notifications.length} color="error">
          <BellIcon />
        </Badge>
      </IconButton>
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
        slotProps={{
          paper: {
            sx: {
              overflow: "hidden",
              borderRadius: 2,
              bgcolor: "#1D1C1C",
              ml: 7,
            },
          },
        }}
      >
        <NotificationContainer>
          <Typography
            variant="body1"
            gutterBottom
            align="left"
            sx={{ color: "#FFFFFF", paddingBottom: 1 }} // Add some padding below the title
          >
            Notifications ({notifications.length})
          </Typography>
          <Divider
            sx={{
              width: "100%",
              mb: 2,
              backgroundColor: "#FFFFFF33",
            }}
          />
          {notifications.length === 0 ? (
            <Typography variant="body2" color="#FFFFFF50" align="center">
              You don't have any new notifications.
            </Typography>
          ) : (
            <NotificationList>
              {notifications.map((notification: NotificationType) => (
                <NotificationItem
                  key={notification.collectionId}
                  sx={{
                    boxShadow: "none",
                    marginBottom: 1,
                  }}
                >
                  <Box padding={1}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          backgroundColor: "#d9d7d7",
                          color: "black",
                          mr: 2,
                        }}
                      >
                        {getUserInitials(notification.senderName)}
                      </Avatar>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: "bold" }}>
                          {notification.senderName}
                        </Box>
                        {` shared the collection '${notification.collectionName}'`}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="left" ml={7} mt={1}>
                      <AcceptActionButton
                        size="small"
                        onClick={() =>
                          handleAccept(
                            notification.id,
                            notification.collectionId
                          )
                        }
                      >
                        Accept
                      </AcceptActionButton>
                      <DenyActionButton
                        size="small"
                        onClick={() => handleDeny(notification.id)}
                      >
                        Deny
                      </DenyActionButton>
                    </Box>
                  </Box>
                </NotificationItem>
              ))}
            </NotificationList>
          )}
        </NotificationContainer>
      </Popover>
    </Box>
  );
};

export default Notification;
