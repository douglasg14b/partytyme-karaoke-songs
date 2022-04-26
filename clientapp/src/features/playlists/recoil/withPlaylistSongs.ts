import { selector } from "recoil";
import { atomPlaylists } from "./atomPlaylists";

export const withPlaylistSongs = selector({
	key: 'withPlaylistSongs', // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		console.log('playlistSongsState run')
		const playlists = get(atomPlaylists);

		// Key: song, value: playlist name
		const songsMap = new Map<string, string>()

		playlists.forEach((playlist) => {
			playlist.songs.forEach((songTrackId) => {
				songsMap.set(songTrackId, playlist.name);
			})
		})

		return songsMap;
	},
});