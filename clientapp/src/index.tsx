import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Songs from './routes/Songs';
import Playlists from './routes/Playlists';
import CssBaseline from '@mui/material/CssBaseline';

import { theme } from './theme';
import { ThemeProvider } from '@mui/material';
import Home from './routes/Home';

import { appInfoProvider } from '@/features/app'

if(appInfoProvider.previousVersion < appInfoProvider.currentVersion) {
	// do nothing,
}

const container = document.getElementById('root')!;

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<App/>}>
              <Route path='home' element={<Home/>}/>
              <Route path='songs' element={<Songs/>}/>
              <Route path='playlists' element={<Playlists/>}/>
            </Route>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </React.Fragment>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
