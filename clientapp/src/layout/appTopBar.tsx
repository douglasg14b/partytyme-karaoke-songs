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


const SearchField = styled(OutlinedInput)({
	'& label.Mui-focused': {
	  color: 'green',
	},
	'& .MuiInput-underline:after': {
	  borderBottomColor: 'green',
	},
	'& .MuiOutlinedInput-root': {
	  '& fieldset': {
		borderColor: 'red',
	  },
	  '&:hover fieldset': {
		borderColor: 'yellow',
	  },
	  '&.Mui-focused fieldset': {
		borderColor: 'green',
	  },
	},
  });
export default function AppTopBar() {
	const location = useLocation();

	const [search, setSearch] = useRecoilState(songSearchState);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Box>
					<Typography variant="h6" gutterBottom component="div">
						{location.pathname}
					</Typography>
				</Box>
				<Box sx={{ flexGrow: 1, display: 'flex', justifyContent:' end' }}>
					<OutlinedInput
						id="outlined-basic"
						size="small"
						margin="dense"
						color="info"
						sx={{background: 'aliceblue', color: 'black'}}
						onChange={onChange}
						endAdornment={
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						} />
				</Box>
			</Toolbar>
		</AppBar>
	);
}