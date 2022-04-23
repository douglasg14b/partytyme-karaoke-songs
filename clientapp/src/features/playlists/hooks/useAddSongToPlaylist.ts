import { useRecoilState } from "recoil";
import { atomPlaylists } from "@/features/playlists/recoil";
import { replaceItemAtIndex } from "@/_utility/utility";
import { Song } from "@/features/songs";
export const useAddSongToPlaylist = () => {
	const [playlists, setPlaylists] = useRecoilState(atomPlaylists);

	const addSong = (playlistId: string, songTrackId: string) => {
		const playlistIndex = playlists.findIndex((x) => x.id === playlistId)

		if (playlistIndex === -1) {
			throw new Error(`Cannot add song, no playlist found for id ${playlistId}`)
		}

		const playlist = { ...playlists[playlistIndex] };
		playlist.songs = Array.from((new Set<string>([...playlist.songs, songTrackId])).keys());

		setPlaylists(replaceItemAtIndex(playlists, playlistIndex, playlist))
	}

	return addSong
}