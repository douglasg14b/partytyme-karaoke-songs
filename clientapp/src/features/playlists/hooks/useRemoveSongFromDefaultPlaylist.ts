import { useRecoilState } from "recoil";
import { atomPlaylists } from "@/features/playlists/recoil";
import { replaceItemAtIndex, removeItemAtIndex } from "@/_utility/utility";

export const useRemoveSongFromDefaultPlaylist = () => {
	const [playlists, setPlaylists] = useRecoilState(atomPlaylists)

	const removeSong = (trackId: string) => {
		const playlistIndex = playlists.findIndex((x) => x.default);
		if (playlistIndex === -1) throw new Error('Cannot remove song, no default playlist exists')

		const playlist = { ...playlists[playlistIndex] };
		const songIndex = playlist.songs.findIndex((x) => x === trackId)

		if (songIndex === -1) {
			setPlaylists(replaceItemAtIndex(playlists, playlistIndex, playlist))
			return
		}
		playlist.songs = removeItemAtIndex(playlist.songs, songIndex)

		setPlaylists(replaceItemAtIndex(playlists, playlistIndex, playlist))
	}

	return removeSong
}