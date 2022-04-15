import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Songs from './routes/Songs';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from './theme';
import { ThemeProvider } from '@mui/material';

const container = document.getElementById('root')!;

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App/>}>
              <Route path='songs' element={<Songs/>}/>  
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
