import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { songSearchState } from '../features/songs/songState';

const titleMappings: Record<string, string> = {
	'/home': 'Karaoke Songs App',
	'/songs': 'Songs',
	'/playlists': 'Playlists',
	'/about': 'About',
}

export default function AppTopBar() {
	const location = useLocation();

	const [search, setSearch] = useRecoilState(songSearchState);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const locationIsSongs = location.pathname === '/songs';

	return (
		<AppBar position="static">
			<Toolbar>
				<Box sx={{ display: 'flex', flexGrow: 1, flexShrink: 1, justifyContent: 'center' }}>
					<Typography variant="h6" gutterBottom component="div">
						{titleMappings[location.pathname] || location.pathname}
					</Typography>
				</Box>
				{locationIsSongs && <Box sx={{ flex: 3, display: 'flex', justifyContent: 'end' }}>
					<OutlinedInput
						value={search}
						size="small"
						margin="dense"
						color="info"
						sx={{ background: 'aliceblue', color: 'black' }}
						onChange={onChange}
						inputProps={{
							autoComplete: "none",
						}}
						endAdornment={
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						} />
				</Box>
				}

			</Toolbar>
		</AppBar>
	);
}