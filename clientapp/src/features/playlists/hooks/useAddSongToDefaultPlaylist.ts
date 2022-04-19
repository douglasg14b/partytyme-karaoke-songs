import { useRecoilState } from "recoil";
import { atomPlaylists } from "@/features/playlists/recoil";
import { replaceItemAtIndex } from "@/_utility/utility";
import { Song } from "@/features/songs";
export const useAddSongToDefaultPlaylist = () => {
	const [playlists, setPlaylists] = useRecoilState(atomPlaylists)

	const addSong = (song: Song) => {
		let index = playlists.findIndex((x) => x.default);

		if (index === -1) {
			throw new Error('Cannot add song, no default playlist exists')
		}

		const playlist = { ...playlists[index] };
		playlist.songs = Array.from((new Set<string>([...playlist.songs, song.trackId])).keys());

		setPlaylists(replaceItemAtIndex(playlists, index, playlist))
	}

	return addSong
}