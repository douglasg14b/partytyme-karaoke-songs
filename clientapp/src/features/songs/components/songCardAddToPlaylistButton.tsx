import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { Song } from '../song';

import { green, red } from '@mui/material/colors';

import styles from './songCard.module.css'
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { playlistCountState, useAddSongToDefaultPlaylist } from '@/features/playlists';
import SongCardId from './songCardId';

type Props = {
	song: Song
	disabled?: boolean
}

export default function SongCardAddToPlaylistButton({ song, disabled }: Props) {
	const addSong = useAddSongToDefaultPlaylist();
	const playlistCount = useRecoilValue(playlistCountState);

	const handleAddToPlaylist = () => {
		addSong(song);
	}

	return (
		<IconButton color='green400' disabled={playlistCount === 0 || disabled} onClick={handleAddToPlaylist} sx={{ position: 'absolute', top: '-4px', right: '-4px' }}>
			<PlaylistAddIcon />
		</IconButton>
	)
}