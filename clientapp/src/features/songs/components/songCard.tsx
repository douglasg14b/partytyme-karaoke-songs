import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import { Song } from '../song';


import styles from './songCard.module.css'
import { useIsSongInPlaylist } from '@/features/playlists/hooks';
import SongCardId from './songCardId';
import SongCardAddToPlaylistButton from './songCardAddToPlaylistButton';
import SongCardRemoveFromPlaylistButton from './songCardRemoveFromPlaylistButton';

type Props = {
	song: Song,
	playlistView?: boolean
}

export default function SongCard({ song, playlistView }: Props) {
	const isInPlaylist = useIsSongInPlaylist(song.trackId)

	return (
		<Card elevation={3} className={isInPlaylist ? styles['is-in-playlist'] : ''}>
			<CardContent sx={{ py: 2, pb: 0, position: 'relative' }} className={styles['pad-bottom']}>
				{ !isInPlaylist && <SongCardAddToPlaylistButton song={song} disabled={isInPlaylist}/>}
				{ isInPlaylist && <SongCardRemoveFromPlaylistButton song={song}/>}
				<Grid container>
					<Grid item xs={12} sx={{ display: 'flex' }}>
						<Grid item xs={12}>
							<div>
								<Typography variant="body2" color="text.primary">
									{song.title}
								</Typography>
							</div>
							<Grid item sx={{ mt: 0, display: 'flex' }}>
								<Grid item>
									<Typography variant="caption" color="text.secondary">
										{song.artist}
									</Typography>
								</Grid>
								<Grid item flexGrow={1}></Grid>
								<Grid item>
									<SongCardId song={song}/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}