import React, { useState, useEffect } from "react";
import { Popover, Typography, Box, IconButton, Badge } from "@mui/material";
import { CheckCircleOutline, CancelOutlined } from "@mui/icons-material"; // Updated Icons
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
        PaperProps={{
          sx: {
            overflow: "hidden",
            borderRadius: 2,
            bgcolor: "#1D1C1C",
          },
        }}
      >
        <NotificationContainer>
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            fontWeight="bold"
            sx={{ color: "#4CAF50", paddingBottom: 1 }} // Add some padding below the title
          >
            Notifications
          </Typography>
          {notifications.length === 0 ? (
            <Typography variant="body2" color="white" align="center">
              You don't have any new notifications.
            </Typography>
          ) : (
            <NotificationList>
              {notifications.map((notification: NotificationType) => (
                <NotificationItem key={notification.collectionId}>
                  <Box padding={1}>
                    <Typography variant="body2">
                      {notification.senderName} shared the collection{" "}
                      {notification.collectionName}
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={1}>
                      <AcceptActionButton
                        size="small"
                        onClick={() =>
                          handleAccept(
                            notification.id,
                            notification.collectionId
                          )
                        }
                      >
                        <CheckCircleOutline fontSize="small" /> Accept
                      </AcceptActionButton>
                      <DenyActionButton
                        size="small"
                        onClick={() => handleDeny(notification.id)}
                      >
                        <CancelOutlined fontSize="small" /> Deny
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
