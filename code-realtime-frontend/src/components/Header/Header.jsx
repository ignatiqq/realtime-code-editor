import React from 'react';
import { Link } from 'react-router-dom';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  TextField,
  Avatar,
  Stack,
} from '@mui/material';
import { deepOrange, deepPurple, green } from '@mui/material/colors';

const Header = ({
  allUsers,
  fontSize,
  options,
  languageHandler,
  fontHandler,
  themeHandler,
  copyLink,
}) => {
  return (
    <div className="codefield__header">
      <div className="codefield__header-options">
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Language</InputLabel>
          <Select
            sx={{ color: '#fff' }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={options.mode.name}
            onChange={languageHandler}
            label="Language">
            <MenuItem value={'javascript'}>Javascript</MenuItem>
            <MenuItem value={'python'}>Python</MenuItem>
            <MenuItem value={'xml'}>XML</MenuItem>
            <MenuItem value={'php'}>PHP</MenuItem>
            <MenuItem value={'css'}>CSS</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Font</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={fontSize}
            onChange={fontHandler}
            label="Font">
            <MenuItem value={'14px'}>14px</MenuItem>
            <MenuItem value={'16px'}>16px</MenuItem>
            <MenuItem value={'18px'}>18px</MenuItem>
            <MenuItem value={'20px'}>20px</MenuItem>
            <MenuItem value={'24px'}>24px</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Theme</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={options.theme}
            onChange={themeHandler}
            label="Theme">
            <MenuItem value={'material'}>material</MenuItem>
            <MenuItem value={'monokai'}>monokai</MenuItem>
            <MenuItem value={'elegant'}>elegant</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        onClick={copyLink}
        InputProps={{
          readOnly: true,
        }}
        label="Page url"
        id="outlined-size-normal"
        value={window.location.href}
      />
      <Stack direction="row" spacing={2}>
        {allUsers.length > 0 &&
          allUsers.map((item) => (
            <Avatar sx={{ bgcolor: deepPurple[200], color: "#ffffff" }} variant="rounded" key={item.id}>
              {item.username[0]}
            </Avatar>
          ))}
      </Stack>
      <div className="codefield__header-leave">
        <Link to="/">
          <Button variant="contained">Leave</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
