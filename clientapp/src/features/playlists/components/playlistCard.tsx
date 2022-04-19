import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import { Playlist } from '@/features/playlists/models';


import SongCard from '@/features/songs/components/songCard';
import { usePlaylistArtists, usePlaylistSongs } from '@/features/playlists/hooks';
import { useEffect, useState } from 'react';

type Props = {
	playlist: Playlist
}

export default function PlaylistCard({ playlist }: Props) {
	const [titleDetails, setTitleDetails] = useState('')

	const songs = usePlaylistSongs(playlist.name);
	const artists = usePlaylistArtists(playlist.name)

	useEffect(() => {
		setTitleDetails(`${songs.length} songs • ${artists.length} artist `);
	}, [songs, artists])

	return (
		<Card elevation={3}>
			<CardContent sx={{ py: 2, pb: 0 }}>
				<Grid container>
					<Grid item xs={12} sx={{ display: 'flex' }} >
						<Grid sx={{flex: 1}}>
							<Typography variant="h6" color="text.primary">
								{playlist.name}
							</Typography>
						</Grid>
						<Grid sx={{display: 'flex', alignItems: 'center'}}>
							<Typography variant="caption" color="text.primary">
								{titleDetails}
							</Typography>
						</Grid>
						<Grid sx={{flex: 1, display: 'flex', justifyContent: 'end'}}>
							<IconButton color='info' sx={{mt: -1}}>
								<EditIcon />
							</IconButton>
						</Grid>

					</Grid>

					<Grid item xs={12}>
						<Divider sx={{ mb: 3, mt: 1 }} />
					</Grid>

					<Grid item xs={12}>
						<Stack spacing={2} sx={{ width: '100%', flexWrap: 'nowrap' }}>
							{songs.map((song) => (
								<SongCard song={song} playlistView key={song.trackId} />
							))}
						</Stack>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}