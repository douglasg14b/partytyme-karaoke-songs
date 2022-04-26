import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import BottomNav from './layout/bottomNav';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AppTopBar from './layout/appTopBar';
import { RecoilRoot } from 'recoil';
import { Dialogs, Toasts } from './components';
import { SplitbeeAnalytics } from './features/app';

function App() {
	return (
		<RecoilRoot>
			<SplitbeeAnalytics/>
			<Container disableGutters sx={{ height: '100%', display: 'flex' }}>
				<Grid container direction="column" flexWrap="nowrap" sx={{ position: 'relative' }}>
					<Grid item>
						<AppTopBar />
					</Grid>
					<Grid item flexGrow="1" display='flex' sx={{ overflowY: 'auto', flexDirection: 'column' }}>
						<Outlet />
					</Grid>
					<Grid item>
						<BottomNav />
					</Grid>
				</Grid>
			</Container>
			<Dialogs/>
			<Toasts/>
		</RecoilRoot>
	);
}

export default App;
