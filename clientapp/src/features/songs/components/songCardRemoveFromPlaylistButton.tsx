import IconButton from '@mui/material/IconButton';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Song } from '../song';


import { useRecoilValue } from 'recoil';
import { playlistCountState, useRemoveSongFromDefaultPlaylist } from '@/features/playlists';

type Props = {
	song: Song
}

export default function SongCardRemoveFromPlaylistButton({ song }: Props) {
	const removeSong = useRemoveSongFromDefaultPlaylist();
	const playlistCount = useRecoilValue(playlistCountState);

	const handleRemove = () => {
		removeSong(song.trackId);
	}

	return (
		<IconButton 
			color='error' 
			disabled={playlistCount === 0} 
			onClick={handleRemove} 
			sx={{ position: 'absolute', top: '-4px', right: '-4px' }}
		>
			<DeleteOutlineIcon fontSize='small' />
		</IconButton>
	)
}