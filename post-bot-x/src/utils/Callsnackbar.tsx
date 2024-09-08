import React from 'react';
import { Button } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

type TAnchorOrigin = {
  vertical: 'bottom' | 'top';
  horizontal: 'right' | 'center' | 'left';
};

const CallSnackbar = {
  success(message?: string, anchorOrigin: TAnchorOrigin = { vertical: 'bottom', horizontal: 'right' }) {
    enqueueSnackbar(message || 'Success', {
      variant: 'success',
      anchorOrigin: anchorOrigin,
      autoHideDuration: 6000,
    });
  },
  error(message?: string, anchorOrigin: TAnchorOrigin = { vertical: 'bottom', horizontal: 'right' }) {
    enqueueSnackbar(message || 'Error', {
      variant: 'error',
      anchorOrigin: anchorOrigin,
      autoHideDuration: 6000,
      persist: true,
    });
  },
  warn(message?: string, anchorOrigin: TAnchorOrigin = { vertical: 'bottom', horizontal: 'right' }) {
    enqueueSnackbar(message || 'Warning', {
      variant: 'warning',
      anchorOrigin: anchorOrigin,
      autoHideDuration: 6000,
    });
  },
  successAndRoute(route: () => void, message?: string, anchorOrigin: TAnchorOrigin = { vertical: 'bottom', horizontal: 'right' }, duration: number = 6000) {
    enqueueSnackbar(message || 'Success', {
      variant: 'success',
      anchorOrigin: anchorOrigin,
      autoHideDuration: duration,
      action: (
        <Button onClick={route} variant="outlined" color="inherit" sx={{ color: 'white' }}>
          GO!
        </Button>
      ),
    });
  }
};

export default CallSnackbar;
