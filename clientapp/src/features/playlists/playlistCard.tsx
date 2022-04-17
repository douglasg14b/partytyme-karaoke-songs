import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import { Playlist } from './playlist';


import SongCard from '@/features/songs/components/songCard';
import { usePlaylistSongs } from './playlistsState';

type Props = {
    playlist: Playlist
}

export default function PlaylistCard({ playlist }: Props) {
	const songs = usePlaylistSongs(playlist.name);

    return (
        <Card elevation={3}>
            <CardContent sx={{ py: 2, pb: 0 }}>
				<Grid container>
					<Grid item xs={12} sx={{textAlign: 'center'}} >
						<Typography variant="h6" color="text.primary">
							{playlist.name}
						</Typography>
						<Divider sx={{mb: 3, mt: 1}} />
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