import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Song } from '@/features/songs';

import styles from './songCard.module.css'
import { useIsSongInPlaylist } from '@/features/playlists/hooks';
import { SongCardBody } from './SongCardBody';
import SongCardActionButtons from './SongCardActionButtons';
import { PlaylistSongCardArrows } from './PlaylistSongCardArrows';
import { Playlist } from '@/features/playlists/models';
import { forwardRef } from 'react';

type Props = {
	playlist: Playlist,
	song: Song,
	style?: React.CSSProperties
}

export const PlaylistSongCard = forwardRef<HTMLDivElement, Props>(({ playlist, song, style }: Props, ref) => {
	const isInPlaylist = useIsSongInPlaylist(song.trackId)

	return (
		<Box ref={ref}>
			<Card  elevation={3} className={isInPlaylist ? styles['is-in-playlist'] : ''} style={style}>
				<CardContent sx={{ py: 2, pb: 0, position: 'relative' }} className={styles['pad-bottom']}>
					<SongCardActionButtons song={song} isInPlaylist={isInPlaylist} />
					<Grid container sx={{ flexWrap: 'nowrap' }}>
						<Grid item xs='auto' sx={{ ml: -2, mr: 1, my: -2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<PlaylistSongCardArrows playlist={playlist} song={song} />
						</Grid>
						<Grid item xs='auto' sx={{ display: 'flex', flexGrow: 1, flexShrink: 1, minWidth: 0 }}> {/* https://stackoverflow.com/a/43809765 for minWidth thing */}
							<Grid item xs={12}>
								<SongCardBody song={song} />
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box >
	)
})