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
import React from 'react';

type Props = {
	song: Song,
	isInPlaylist: boolean,
}

export default function SongCardActionButtons({ song, isInPlaylist }: Props) {

	return (
		<React.Fragment>
			{ !isInPlaylist && <SongCardAddToPlaylistButton song={song} disabled={isInPlaylist}/>}
			{ isInPlaylist && <SongCardRemoveFromPlaylistButton song={song}/>}
		</React.Fragment>
	)
}