import QRCode from "react-qr-code";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import GitHubIcon from '@mui/icons-material/GitHub';

const qrCodeImage = require('@/assets/qr-code.png')

export default function Home() {

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
			<Typography variant="body2" sx={{ pt: 3, flexBasis: '15%' }}>
				<div>
					Made with ❤️ by <a href="https://github.com/douglasg14b" target="_blank" >Douglas Gaskell</a>
				</div>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
					<Button
						color="inherit"
						variant="text"
						href="https://github.com/douglasg14b/partytyme-karaoke-songs"
						target="_blank"
						sx={{ textTransform: 'none' }}
					>
						<GitHubIcon fontSize="small" sx={{ mr: 2 }} /> Source
					</Button>

				</Box>
			</Typography>

			<Box sx={{ flex: 1 }} />
			<Grid item sx={{ mt: 6 }}>
				Features to Add:
				<ul>
					<li>Playlist Sharing</li>
					<li>Playlist Colors</li>
					<li>Playlist Copy All Codes</li>
					<li>Favorites</li>
					<li>Times Sung</li>
				</ul>
			</Grid>
			<Box sx={{ my: 2, mb: 8, mx: 4 }}>
				<img src={require('@/assets/qr-code.png')} alt="qr code" style={{width: '70vw'}} />
				{/* <QRCode level="L" value="https://douglasg14b.github.io/partytyme-karaoke-songs/#/songs" /> */}
			</Box>

		</Box>

	);
}