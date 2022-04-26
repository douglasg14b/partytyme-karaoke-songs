import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';


export default function Attribution() {

	return (<Typography component="div" variant="body2" sx={{ pt: 3, flexBasis: '5%' }}>
		<div>
			Made with ❤️ by <a href="https://github.com/douglasg14b" target="_blank" >Douglas Gaskell</a>
		</div>
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
			<Button
				color="inherit"
				variant="outlined"
				size="small"
				href="https://github.com/douglasg14b/partytyme-karaoke-songs"
				target="_blank"
				sx={{ textTransform: 'none', mr: 2 }}
			>
				<GitHubIcon fontSize="small" sx={{ mr: 2 }} /> Source
			</Button>
			<Button
				color="inherit"
				variant="outlined"
				size="small"
				href="https://github.com/douglasg14b/partytyme-karaoke-songs/issues"
				target="_blank"
				sx={{ textTransform: 'none' }}
			>
				<BugReportIcon fontSize="small" color="error" sx={{ mr: 1 }} /> Report a Bug
			</Button>
		</Box>
	</Typography>
	);
}