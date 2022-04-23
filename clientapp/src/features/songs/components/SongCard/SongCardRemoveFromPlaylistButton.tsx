import IconButton from '@mui/material/IconButton';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Song } from '@/features/songs';


import { useRecoilValue } from 'recoil';
import { useRemoveSongFromDefaultPlaylist } from '@/features/playlists/hooks';
import { withPlaylistCount } from '@/features/playlists/recoil';

type Props = {
	song: Song
}

export default function SongCardRemoveFromPlaylistButton({ song }: Props) {
	const removeSong = useRemoveSongFromDefaultPlaylist();
	const playlistCount = useRecoilValue(withPlaylistCount);

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