import React from 'react';
import io from 'socket.io-client';

import { Username } from '../../App';
import { MainPage } from '..';
import { CodeField, Notification, Header } from '../../components';

import './CodePage.scss';

const serverUrl = 'http://localhost:3333/';
export const socket = io(serverUrl);

const CodePage = React.memo(() => {
  const [fontSize, setFontSize] = React.useState('16px');
  const [isAuth, setIsAuth] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [notification, setNotification] = React.useState([]);
  const [options, setOptions] = React.useState({
    mode: { name: 'javascript' },
    theme: 'material',
    lineNumbers: true,
  });

  const { username } = React.useContext(Username);

  const roomId = window.location.href.split('/')[4];

  React.useEffect(() => {
    if (username !== '') {
      setIsAuth(true);
      socket.emit('join', { username, roomId });
      socket.on('joined', (username, roomMembers) => {
        setNotification([
          ...notification,
          {
            title: `${username} joined room`,
            severity: 'success',
            notificationText: `Say hi to ${username}`,
          },
        ]);
      });
      socket.on('roomMembers', (roomMembers) => {
        setAllUsers([...roomMembers]);
      });
      socket.on('disconnected', (username, roomMembers) => {
        setNotification([
          ...notification,
          {
            title: `${username} left room`,
            severity: 'warning',
            notificationText: `Goodbye ${username}`,
          },
        ]);
      });
      socket.on('error-text', (error) => {
        setNotification([
          ...notification,
          {
            title: `Ошибка!`,
            severity: 'error',
            notificationText: `Произошла ошибка ${error}`,
          },
        ]);
      });
    }
  }, [username]);

  React.useEffect(() => {
    if (localStorage.getItem('language')) {
      setOptions((options) => ({ ...options, mode: { name: localStorage.getItem('language') } }));
    }
    if (localStorage.getItem('font')) {
      setFontSize(localStorage.getItem('font'));
    }

    if (localStorage.getItem('theme')) {
      setOptions((options) => ({ ...options, theme: localStorage.getItem('theme') }));
    }
  }, []);

  const languageHandler = (e) => {
    setOptions({ ...options, mode: { name: e.target.value } });
    localStorage.setItem('language', e.target.value);
  };

  const fontHandler = (e) => {
    setFontSize(e.target.value);
    localStorage.setItem('font', e.target.value);
  };

  const themeHandler = (e) => {
    setOptions({ ...options, theme: e.target.value });
    localStorage.setItem('theme', e.target.value);
  };

  const copyLink = (e) => {
    e.target.select();
    document.execCommand('copy');
    setNotification([
      ...notification,
      {
        notificationText:
          'Вы успешно скопировали ссылку, теперь вы можете поделиться ей с друзьями!',
        severity: 'success',
        title: 'Скопировано!',
      },
    ]);
  };

  const closeNotification = (item) => {
    setNotification((prev) => prev.filter((el) => el !== item));
  };

  return (
    <div className="codefield">
      {isAuth === true ? (
        <React.Fragment>
          <Header
            allUsers={allUsers}
            fontSize={fontSize}
            options={options}
            languageHandler={languageHandler}
            fontHandler={fontHandler}
            themeHandler={themeHandler}
            copyLink={copyLink}
          />
          <CodeField socket={socket} roomId={roomId} fontSize={fontSize} options={options} />
        </React.Fragment>
      ) : (
        <MainPage />
      )}
      <Notification closeNotification={closeNotification} notification={notification} />
    </div>
  );
});

export default CodePage;
