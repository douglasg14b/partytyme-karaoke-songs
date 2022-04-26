import { atom, selector } from "recoil";
import { songsArray, songsService } from "./songsService";

const songSearchState = atom({
	key: 'songSearchState',
	default: '',
});

const selectedArtistState = atom({
	key: 'selectedArtistState',
	default: '',
});

const songSearchResults = selector({
	key: 'songSearchResults', // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const search = get(songSearchState);
		const artist = get(selectedArtistState);

		if(!search && !artist) {
			return songsArray;
		}
		
		return songsService.search(search, artist);
	},
});

export {
	songSearchState,
	selectedArtistState,
	songSearchResults
}
