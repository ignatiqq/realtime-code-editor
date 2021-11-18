import React from 'react';
import { Stack } from '@mui/material';

import { AlertItem } from '..';

const Notification = ({ notification, closeNotification }) => {
  return (
    <Stack sx={{ maxWidth: '20%', position: 'fixed', top: '20px', right: '20px' }} spacing={2}>
      {notification.length > 0 &&
        notification.map((item, i) => (
          <AlertItem
            key={item.notificationText + i}
            item={item}
            {...item}
            closeNotification={closeNotification}
          />
        ))}
    </Stack>
  );
};

export default Notification;
