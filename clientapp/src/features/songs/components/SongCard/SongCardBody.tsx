import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Song } from '@/features/songs';

import SongCardId from './SongCardId';

type Props = {
	song: Song
}

export function SongCardBody({ song }: Props) {
	return (
		<React.Fragment>
			<div style={{ marginRight: '4px' }}>
				<Typography variant="body2" color="text.primary" className='text-ellipsis'>
					{song.title}
				</Typography>
			</div>
			<Grid item sx={{ mt: 0, display: 'flex' }}>
				<Grid item xs={9} className='text-ellipsis'>
					<Typography variant="caption" color="text.secondary" >
						{song.artist}
					</Typography>
				</Grid>
				<Grid item flexGrow={1}></Grid>
				<Grid item>
					<SongCardId song={song} />
				</Grid>
			</Grid>
		</React.Fragment>
	)
}