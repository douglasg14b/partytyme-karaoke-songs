import { localStorageEffect } from "@/effects/localStorageEffect";
import { atom } from "recoil";
import { Playlist } from "@/features/playlists/models/playlist";
import { uuidv4 } from "@/_utility";

export const atomPlaylists = atom<Playlist[]>({
	key: 'atomPlaylists', // unique ID (with respect to other atoms/selectors)
	default: [{
		id: uuidv4(),
		name: '⭐ Favorites',
		default: true,
		deleted: false,
		songs: []
	}], // default value (aka initial value),
	effects: [
		localStorageEffect('atomPlaylists', ['playlistsState'])
	]
});