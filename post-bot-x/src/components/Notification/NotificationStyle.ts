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
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2), 
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#151414", // Darker grey
  color: "#fff", // White text for contrast
  borderRadius: "8px", // Increase border radius
  justifyContent:"center",
  alignItems:"center",
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
    width: "6px", // Width of the scrollbar
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#1D1C1C", // Background color of the scrollbar track
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#4CAF50", // Light green color for the scrollbar thumb
    borderRadius: "8px", // Rounded corners of the scrollbar thumb
  },
}));


// Styled Bell Icon
export const BellIcon = styled(NotificationsIcon)(({ theme }) => ({
  color: "#4CAF50", // Green color
  width: 40, // Adjusted width
  height: 40, // Adjusted height
  cursor: "pointer",
}));

export const AcceptActionButton = styled(Button)(({ theme }) => ({
  color: "#4CAF50",
  textTransform: "none", // Prevent text from being all caps
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(1),
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(0.5),
  },
  '&:hover': {
    color: "#127807", 
  },
}));

export const DenyActionButton = styled(Button)(({ theme }) => ({
  color: "#d61529",
  textTransform: "none", // Prevent text from being all caps
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(1),
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(0.5),
  },
  '&:hover': {
    color: "#873109", 
  },
}));

