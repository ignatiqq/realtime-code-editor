import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const AlertItem = ({ item, notificationText, severity, title, closeNotification }) => {
  React.useEffect(() => {
    setTimeout(() => {
      closeNotification(item);
    }, 5000);
  }, []);
  return (
    <Alert onClose={() => closeNotification(item)} severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {notificationText}
    </Alert>
  );
};

export default AlertItem;
