import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Username } from '../../App';

import './MainPage.scss';

const MainPage = () => {
  const [user, setUser] = React.useState(`user${Date.now()}`);
  const [pageId, setPageId] = React.useState('');

  const { setUsername } = React.useContext(Username);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.location.href.split('/')[4] !== undefined) {
      setPageId(window.location.href.split('/')[4]);
    }
  }, []);

  const blurHandler = (e) => {
    if (e.target.value === '') {
    }
  };

  const createRoom = (e) => {
    setUsername(user);
    if (pageId !== '') {
      navigate(`/code/${pageId}`);
    } else {
      navigate(`/code/${Date.now()}`);
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__title">Edit and Learn coding with your friends</div>
        <form className="login__input">
          <TextField
            fullWidth
            label="Set username"
            id="outlined-size-normal"
            onBlur={blurHandler}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Button
            onClick={createRoom}
            disabled={user.length <= 0 ? true : false}
            variant="contained">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
