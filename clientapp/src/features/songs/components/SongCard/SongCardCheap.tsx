import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Song } from '@/features/songs';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import styles from './songCard.module.css'
import { useIsSongInPlaylist } from '@/features/playlists/hooks';
import { red } from '@mui/material/colors';
import React from 'react';

type Props = {
	song: Song,
	style?: React.CSSProperties
}

export const SongCardCheap = React.memo(function SongCardCheap({ song, style }: Props) {
	const isInPlaylist = useIsSongInPlaylist(song.trackId)

	return (
		<Card elevation={3} className={isInPlaylist ? styles['is-in-playlist'] : ''} style={style}>
			<CardContent sx={{ py: 2, pb: 0, position: 'relative' }} className={styles['pad-bottom']}>
				{!isInPlaylist && <PlaylistAddIcon color='green400' sx={{ position: 'absolute', top: '4px', right: '4px' }} />}
				{isInPlaylist && <DeleteOutlineIcon color='error'  fontSize='small' sx={{ position: 'absolute', top: '4px', right: '4px' }} />}
				<Grid container>
					<Grid item xs={12} sx={{ display: 'flex' }}>
						<Grid item xs={12}>
							<div>
								<Typography variant="body2" color="text.primary" className='text-ellipsis'>
									{song.title}
								</Typography>
							</div>
							<Grid item sx={{ mt: 0, display: 'flex' }}>
								<Grid item xs={9} className='text-ellipsis'>
									<Typography variant="caption" color="text.secondary">
										{song.artist}
									</Typography>
								</Grid>
								<Grid item flexGrow={1}></Grid>
								<Grid item sx={{mb: 1, mr: -0.25}}>
									<Typography variant="caption" color={red[700]}>
										<code>{song.trackId}</code>
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}, (prevProps, nextProps) => true)