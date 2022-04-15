import { atom, selector } from "recoil";
import { songsArray, songsService } from "./songsService";

const songSearchState = atom({
	key: 'songSearchState', // unique ID (with respect to other atoms/selectors)
	default: '', // default value (aka initial value)
});

const songSearchResults = selector({
	key: 'songSearchResults', // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const search = get(songSearchState);

		if(!search) {
			return songsArray.slice(0, 25);
		}
		
		return songsService.search(search)
	},
});

export {
	songSearchState,
	songSearchResults
}
