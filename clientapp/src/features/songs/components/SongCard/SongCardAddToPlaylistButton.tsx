import useEventBus from '@jeyz/event-bus'
import IconButton from '@mui/material/IconButton';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { Song } from '@/features/songs';


import { useRecoilValue } from 'recoil';
import { useAddSongToDefaultPlaylist } from '@/features/playlists/hooks';
import { withPlaylistCount } from '@/features/playlists/recoil';
import { DialogEventBusMessages } from '@/_utility';

type Props = {
	song: Song
	disabled?: boolean
}

export default function SongCardAddToPlaylistButton({ song, disabled }: Props) {
	const eventBus = useEventBus<DialogEventBusMessages>();
	const addSong = useAddSongToDefaultPlaylist();
	const playlistCount = useRecoilValue(withPlaylistCount);

	const handleAddToPlaylist = () => {
        eventBus.publish({
            topic: 'AddSongToPlaylist',
            payload: { songTrackId: song.trackId }
        });
		// addSong(song);
	}

	return (
		<IconButton color='green400' disabled={playlistCount === 0 || disabled} onClick={handleAddToPlaylist} sx={{ position: 'absolute', top: '-4px', right: '-4px' }}>
			<PlaylistAddIcon />
		</IconButton>
	)
}