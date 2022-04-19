import { localStorageEffect } from "@/effects/localStorageEffect";
import { atom } from "recoil";
import { Playlist } from "@/features/playlists/models/playlist";

export const atomPlaylists = atom<Playlist[]>({
	key: 'atomPlaylists', // unique ID (with respect to other atoms/selectors)
	default: [{
		name: 'Default',
		default: true,
		deleted: false,
		songs: []
	}], // default value (aka initial value),
	effects: [
		localStorageEffect('atomPlaylists', ['playlistsState'])
	]
});