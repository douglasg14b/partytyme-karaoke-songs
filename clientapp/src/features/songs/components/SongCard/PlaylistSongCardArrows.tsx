import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';

import React, { useEffect, useState } from 'react';
import { Playlist } from '@/features/playlists/models';
import { Song } from '@/features/songs';
import { useMoveSongInPlaylist } from '@/features/playlists/hooks';

interface Props {
	playlist: Playlist,
	song: Song
}

export function PlaylistSongCardArrows({ playlist, song }: Props) {
	const [disableUp, setDisableUp] = useState(false);
	const [disableDown, setDisableDown] = useState(false);
	const [songIndex, setSongIndex] = useState(-1);
	const moveSong = useMoveSongInPlaylist();

	useEffect(() => {
		const index = playlist.songs.findIndex((x) => x === song.trackId)
		setSongIndex(index)
	}, [playlist.songs, song.trackId])

	useEffect(() => {
		setDisableUp(songIndex === 0);
		setDisableDown(songIndex === playlist.songs.length - 1)
	}, [playlist.songs.length, songIndex])

	const handleMoveUp = () => {
		moveSong(playlist.id, songIndex, 'up');
	}

	const handleMoveDown = () => {
		moveSong(playlist.id, songIndex, 'down');
	}

	return (
		<React.Fragment>
			<IconButton onClick={handleMoveUp} disabled={disableUp} size="small" color='grey600' sx={{ padding: 0 }}>
				<KeyboardArrowUpIcon />
			</IconButton>
			<Typography variant="caption" color="text.secondary" sx={{lineHeight: '0.75rem'}} >
				{songIndex + 1}
			</Typography>
			<IconButton onClick={handleMoveDown}  disabled={disableDown} size="small" color='grey600' sx={{ padding: 0 }}>
				<KeyboardArrowDownIcon />
			</IconButton>
		</React.Fragment>
	)
}