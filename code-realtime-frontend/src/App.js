import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";

import {CodePage, MainPage} from "./pages";

import "./styles/index.scss";

export const Username = React.createContext();

const theme = createTheme({
  typography: {
    fontFamily: 'Manrope',
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#C792EA",
      contrastText: "#fff"
    },
    secondary: {
      main: '#00FF00',
    },
  }
});

function App() {
  const [username, setUsername] = React.useState("");

  return (
    <ThemeProvider theme={theme}>
      <Username.Provider value={{username, setUsername}}>
        <div className="App">
          <Routes>
            <Route exact path="/code/:id" element={<CodePage />} />
            <Route exact path="/" element={<MainPage />} />
          </Routes>
        </div>
      </Username.Provider>
    </ThemeProvider>
  );
}

export default App;
