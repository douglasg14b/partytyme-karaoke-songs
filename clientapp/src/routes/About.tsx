import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CheckIcon from '@mui/icons-material/Check';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Attribution from "@/components/Attribution";

const TableRoot = function (props: any) {
	return (
		<Paper  {...props} elevation={4} />
	)
}


const rows = [
	{ name: 'Link Share QR Code', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Multiple Playlists', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Edit Playlists', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Rearrange Songs', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Undo Playlist Delete', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Infinite Scroll', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Artist Filter', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Song Id Copy', status: <CheckIcon fontSize="small" color="green400" /> },
	{ name: 'Single Song, Many Playlists', status: <QuestionMarkIcon fontSize="small" color="orange800" /> },
	{ name: 'Playlist Colors', status: <QuestionMarkIcon fontSize="small" color="orange800" /> },
	{ name: 'Playlist Copy Codes', status: <QuestionMarkIcon fontSize="small" color="orange800" /> },
	{ name: 'Playlist Sharing', status: <QuestionMarkIcon fontSize="small" color="orange800" /> },
	{ name: 'Times Sung', status: <QuestionMarkIcon fontSize="small" color="orange800" /> },
];

export default function About() {

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, mx: 5 }}>
			<Attribution />

			<Grid item sx={{ mt: 3, width: '100%' }}>
				<Paper elevation={3} sx={{ p: 3, width: '100%' }}>
					<Typography component="div" variant="body2">
						Created to learn React and because 477 pages of dead trees is an excessively annoying way to find songs for Karaoke
					</Typography>
				</Paper>

			</Grid>


			<Grid item sx={{ mt: 6, mb: 5, width: '100%' }}>
				<TableContainer component={TableRoot} sx={{ maxHeight: '50vh' }}>
					<Table stickyHeader size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Feature</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align="left">{row.name}</TableCell>
									<TableCell align="center">{row.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>

			<Box sx={{ flex: 1 }} />
		</Box>

	);
}