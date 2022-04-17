import QRCode from "react-qr-code";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Home() {

    return (
		<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>

			<QRCode value="https://douglasg14b.github.io/partytyme-karaoke-songs/#/songs"/>
			<Grid item sx={{mt: 6}}>
				Features to Add:
				<ul>
					<li>Add/Remove Playlists</li>
					<li>Playlist Sharing</li>
					<li>Playlist Sorting</li>
					<li>Playlist Colors</li>
					<li>Playlist Copy All Codes</li>
					<li>Favorites</li>
					<li>Times Sung</li>
					<li>Improved Search</li>
				</ul>
			</Grid>
		</Box>

    );
}