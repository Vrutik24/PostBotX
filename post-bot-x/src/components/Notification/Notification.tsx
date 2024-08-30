import React, { useState, useEffect } from "react";
import { Popover, Typography, Box, IconButton, Badge } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useNotification } from "../../contexts/NotificationContext";
import { useCollection } from "../../contexts/CollectionContext";
import { Notification as NotificationType } from "../../types";
import { BellIcon, NotificationItem, NotificationList, NotificationContainer } from "./NotificationStyle";
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

  const handleAccept = async (notificationId?: string, collectionId?: string) => {
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

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleBellClick}>
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
      >
        <NotificationContainer>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          {notifications.length === 0 ? (
            <Typography variant="body2" color="white">
              You don't have any new notifications.
            </Typography>
          ) : (
            <NotificationList>
              {notifications.map((notification: NotificationType) => (
                <NotificationItem key={notification.collectionId}>
                  <Typography variant="body2">
                    {notification.senderName} shared the collection{" "}
                    {notification.collectionName}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        handleAccept(notification.id, notification.collectionId)
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
          )}
        </NotificationContainer>
      </Popover>
    </>
  );
};

export default Notification;
