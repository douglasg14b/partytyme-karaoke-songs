
import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';

import { Playlist } from '../models';

import { usePlaylistArtists } from '@/features/playlists/hooks';

interface Props {
	playlist: Playlist,
	hideEdit?: boolean,
	onEdit?: () => void,
	onClick?: () => void,
}
export function PlaylistCardHeader({ playlist, hideEdit, onEdit, onClick }: Props) {
	const [titleDetails, setTitleDetails] = useState('')

	const artists = usePlaylistArtists(playlist.name)

	useEffect(() => {
		setTitleDetails(`${playlist.songs.length} songs • ${artists.length} artist `);
	}, [playlist, artists])

	return (
		<Grid item xs={12} sx={{ display: 'flex' }} onClick={onClick} >
			<Grid sx={{ flex: '1 0 auto' }}>
				<Typography variant="h6" color="text.primary">
					{playlist.name}
				</Typography>
			</Grid>
			<Grid sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant="caption" color="text.primary">
					{titleDetails}
				</Typography>
			</Grid>
			<Grid sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'end' }}>
				{!hideEdit &&
					<IconButton color='info' sx={{ mt: -1 }} onClick={onEdit}>
						<EditIcon />
					</IconButton>
				}
			</Grid>
		</Grid>
	)
}