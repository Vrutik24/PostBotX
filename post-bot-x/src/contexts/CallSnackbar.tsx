import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

type TAnchorOrigin = {
  vertical: "bottom" | "top";
  horizontal: "right" | "center" | "left";
};

const CallSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const DismissButton = (key: string | number) => (
    <Button
      onClick={() => closeSnackbar(key)}
      variant="outlined"
      color="inherit"
      sx={{ color: "white" }}
    >
      Dismiss
    </Button>
  );

  return {
    success(
      message?: string,
      anchorOrigin: TAnchorOrigin = { vertical: "bottom", horizontal: "right" }
    ) {
      enqueueSnackbar(message || "Success", {
        variant: "success",
        anchorOrigin: anchorOrigin,
        autoHideDuration: 6000,
        action: (key) => DismissButton(key),
      });
    },
    error(
      message?: string,
      anchorOrigin: TAnchorOrigin = { vertical: "bottom", horizontal: "right" }
    ) {
      enqueueSnackbar(message || "Error", {
        variant: "error",
        anchorOrigin: anchorOrigin,
        autoHideDuration: 6000,
        persist: true,
        action: (key) => DismissButton(key),
      });
    },
    warn(
      message?: string,
      anchorOrigin: TAnchorOrigin = { vertical: "bottom", horizontal: "right" }
    ) {
      enqueueSnackbar(message || "Warning", {
        variant: "warning",
        anchorOrigin: anchorOrigin,
        autoHideDuration: 6000,
        action: (key) => DismissButton(key),
      });
    },
    successAndRoute(
      route: () => void,
      message?: string,
      anchorOrigin: TAnchorOrigin = { vertical: "bottom", horizontal: "right" },
      duration: number = 6000
    ) {
      enqueueSnackbar(message || "Success", {
        variant: "success",
        anchorOrigin: anchorOrigin,
        autoHideDuration: duration,
        action: (key) => (
          <>
            <Button
              onClick={route}
              variant="outlined"
              color="inherit"
              sx={{ color: "white" }}
            >
              GO!
            </Button>
            {DismissButton(key)}
          </>
        ),
      });
    },
  };
};

export default CallSnackbar;
