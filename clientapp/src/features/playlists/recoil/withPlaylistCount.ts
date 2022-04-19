import { selector } from "recoil";
import { atomPlaylists } from "./atomPlaylists";

export const withPlaylistCount = selector({
	key: 'withPlaylistCount', // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const playlists = get(atomPlaylists);

		return playlists.length;
	},
});