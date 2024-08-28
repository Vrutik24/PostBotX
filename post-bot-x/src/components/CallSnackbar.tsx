import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";

type TAnchorOrigin = {
  vertical: "bottom" | "top";
  horizontal: "right" | "center" | "left";
};

//each function receives a string to render to the toast pop up
const CallSnackbar = {
  success(
    message: string = "Success",
    anchorOrigin: TAnchorOrigin = { vertical: "bottom", horizontal: "right" }
  ) {
    return enqueueSnackbar(message, {
      variant: "success",
      anchorOrigin,
      // maxSnack: 1, // Uncomment if needed
    });
  },
  // success(message?: string, anchorOrigin: TAnchorOrigin = { vertical: 'bottom', horizontal: 'right' }) {
  //   return enqueueSnackbar(message || 'Success', {
  //     // open: true,
  //     // message: message || 'Success',
  //     variant: 'success',
  //     anchorOrigin: anchorOrigin,
  //     // maxSnack: 1
  //   });
  // },
  error(
    message?: string,
    anchorOrigin: TAnchorOrigin = { vertical: "bottom", horizontal: "right" }
  ) {
    return enqueueSnackbar(message || "Error", {
      // open: true,
      // message: message || 'Error',
      variant: "error",
      anchorOrigin: anchorOrigin,
      // persist: true,
      // maxSnack: 3
    });
  },
  warn(
    message?: string,
    anchorOrigin: TAnchorOrigin = { vertical: "bottom", horizontal: "right" }
  ) {
    return enqueueSnackbar(message || "Warning", {
      // open: true,
      // message: message || 'Warning',
      variant: "warning",
      anchorOrigin: anchorOrigin,
    });
  },
  // successAndRoute(route: any, message?: string, anchorOrigin: TAnchorOrigin = { vertical: 'bottom', horizontal: 'right' }) {
  //   return enqueueSnackbar({
  //     open: true,
  //     action: (
  //       <Button onClick={route} variant="outlined" color="inherit" sx={{ color: 'white' }}>
  //         GO!
  //       </Button>
  //     ),
  //     message: message || 'Success',
  //     variant: 'successAndRoute',
  //     anchorOrigin: anchorOrigin,
  //     maxSnack: 1
  //   });
  // }
};

export default CallSnackbar;
