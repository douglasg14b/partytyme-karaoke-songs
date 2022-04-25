import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Playlist } from '@/features/playlists/models';
import { useRecoilValue } from 'recoil';
import { atomPlaylists } from '../recoil';
import { PlaylistCardHeader } from './PlaylistCardHeader';
import { useAddSongToPlaylist } from '../hooks';
import { blue } from '@mui/material/colors';

interface Props {
	trackId: string
	isOpen: boolean,
	onClose: () => void
}

export function AddSongToPlaylistDialog({ trackId, isOpen, onClose }: Props) {

	const playlists = useRecoilValue(atomPlaylists);
	const addSong = useAddSongToPlaylist();

	const handleAddToPlaylist = (playlist: Playlist) => {
		addSong(playlist.id, trackId);
		onClose()
	}

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
			<DialogTitle color={blue[500]} sx={{ textAlign: 'center', pb: 0, pt: 2 }}>Add To Playlist</DialogTitle>
			<Divider/>
			<DialogContent sx={{ pt: 0, pb: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				{playlists.map((playlist) =>
					<Card key={playlist.id} elevation={3} sx={{py: 1, px: 2, mt: 2}} onClick={() => handleAddToPlaylist(playlist)}>
						<PlaylistCardHeader playlist={playlist} hideEdit />

					</Card>
				)}
			</DialogContent>
			<DialogActions sx={{ py: 1 }}>
				<div style={{ flex: 1 }}></div>
				<Button color="inherit" onClick={onClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}