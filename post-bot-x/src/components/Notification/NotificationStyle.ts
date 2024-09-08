import { styled } from "@mui/material/styles";
import { Box, Paper, Button } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

// Container for the entire notification popover
export const NotificationContainer = styled(Box)(({ theme }) => ({
  width: "400px", // Fixed width
  padding: theme.spacing(2),
  backgroundColor: "#1D1C1C", // Black background for the container
  color: "#fff", // White text for contrast
  borderRadius: "8px", // Increase border radius
}));

// Notification item component with grey background
export const NotificationItem = styled(Paper)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "transparent", // Darker grey
  color: "#fff", // White text for contrast
  justifyContent: "center",
  alignItems: "left",
}));

export const NotificationList = styled(Box)(({ theme }) => ({
  maxHeight: "300px", // Adjusted max height for better popover control
  overflowY: "auto", // Enables vertical scrolling
  overflowX: "hidden", // Ensures no horizontal scroll appears
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start", // Aligns content to the start to avoid overlap
  alignItems: "center",
  marginTop: theme.spacing(1), // Adds some spacing from the title
  /* Custom scrollbar styling */
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
}));

// Styled Bell Icon
export const BellIcon = styled(NotificationsIcon)(({ theme }) => ({
  color: "#d9d7d7", 
  width: 30, // Adjusted width
  height: 30, // Adjusted height
  cursor: "pointer",
}));

export const AcceptActionButton = styled(Button)(({ theme }) => ({
  background: "#4CAF50",
  color: "#FFF",
  textTransform: "none", // Prevent text from being all caps
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(1),
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(0.5),
  },
  "&:hover": {
    backgroundColor: "darkgreen",
  },
}));

export const DenyActionButton = styled(Button)(({ theme }) => ({
  background: "#FFFFFF33",
  color: "#FFF",
  textTransform: "none", // Prevent text from being all caps
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(1),
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(0.5),
  },
  "&:hover": {
    background: "#FFFFFF70",
  },
}));
