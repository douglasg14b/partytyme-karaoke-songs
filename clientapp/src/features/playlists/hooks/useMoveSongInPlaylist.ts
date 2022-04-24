import { useRecoilState } from "recoil";
import { atomPlaylists } from "@/features/playlists/recoil";
import { moveItem, replaceItemAtIndex } from "@/_utility/utility";
export const useMoveSongInPlaylist = () => {
	const [playlists, setPlaylists] = useRecoilState(atomPlaylists);

	const moveSong = (playlistId: string, songIndex: number, direction: 'up' | 'down') => {

		const playlistIndex = playlists.findIndex((x) => x.id === playlistId)

		if (playlistIndex === -1) {
			throw new Error(`Cannot move song, no playlist found for id ${playlistId}`)
		}

		const playlist = { ...playlists[playlistIndex] };
		let moveTo = direction === 'up' ? songIndex - 1 : songIndex + 1;
		moveTo = Math.min(playlist.songs.length - 1, Math.max(0, moveTo)); // Constrain between 0 and last index

		playlist.songs = moveItem([...playlist.songs], songIndex, moveTo);

		setPlaylists(replaceItemAtIndex(playlists, playlistIndex, playlist))
	}

	return moveSong
}