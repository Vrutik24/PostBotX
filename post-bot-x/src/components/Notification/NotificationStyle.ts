import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

// Container for the entire notification popover
export const NotificationContainer = styled(Box)(({ theme }) => ({
  width: "400px",  // Fixed width
  padding: theme.spacing(2),
  backgroundColor: "#151414", // Black background for the container
  color: "#fff",  // White text for contrast
  borderRadius: "5px",
}));

// Notification item component with grey background
export const NotificationItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#535a53", // Grey
  color: "#fff", // White text for contrast
  borderRadius: "5px",
}));

// Notification list component with #151414 background
export const NotificationList = styled(Box)(({ theme }) => ({
  maxHeight: "400px",  // Fixed max height
  overflowY: "auto",   // Enables vertical scrolling
  overflowX: "hidden", // Ensures no horizontal scroll appears
  width: "100%",
  padding: theme.spacing(1),
}));

// Styled Bell Icon
export const BellIcon = styled(NotificationsIcon)(({ theme }) => ({
  color: "#4CAF50", // Green color
  width: 40,        // Adjusted width
  height: 40,       // Adjusted height
  cursor: "pointer",
}));
