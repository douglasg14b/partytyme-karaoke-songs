import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import { Song } from '@/features/songs';


import styles from './songCard.module.css'
import { useIsSongInPlaylist } from '@/features/playlists/hooks';
import SongCardId from './SongCardId';
import SongCardAddToPlaylistButton from './SongCardAddToPlaylistButton';
import SongCardRemoveFromPlaylistButton from './SongCardRemoveFromPlaylistButton';
import { SongCardBody } from './SongCardBody';
import SongCardActionButtons from './SongCardActionButtons';

type Props = {
	song: Song,
	style?: React.CSSProperties
}

export function SongCard({ song, style }: Props) {
	const isInPlaylist = useIsSongInPlaylist(song.trackId)

	return (
		<Card elevation={3} className={isInPlaylist ? styles['is-in-playlist'] : ''} style={style}>
			<CardContent sx={{ py: 2, pb: 0, position: 'relative' }} className={styles['pad-bottom']}>
				<SongCardActionButtons song={song} isInPlaylist={isInPlaylist} />
				<Grid container>
					<Grid item xs={12} sx={{ display: 'flex' }}>
						<Grid item xs={12}>
							<SongCardBody song={song}/>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}