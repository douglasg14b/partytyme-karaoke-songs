import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Playlist } from "./playlist";
import { Song, songsService } from '@/features/songs'
import { localStorageEffect } from "@/effects/localStorageEffect";

function replaceItemAtIndex(arr: any[], index: number, newValue: any) {
	return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: any[], index: number) {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const playlistsState = atom<Playlist[]>({
	key: 'playlistsState', // unique ID (with respect to other atoms/selectors)
	default: [{
		name: 'Default',
		default: true,
		deleted: false,
		songs: []
	}], // default value (aka initial value),
	effects: [
		localStorageEffect('playlistsState')
	]
});


const playlistCountState = selector({
	key: 'playlistCountState', // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const playlists = get(playlistsState);

		return playlists.length;
	},
});

const playlistSongsState = selector({
	key: 'playlistSongsState', // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const playlists = get(playlistsState);

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

const usePlaylistSongs = (name: string) => {
	const [playlists, setPlaylists] = useRecoilState(playlistsState);

	const playlist = playlists.find((x) => x.name === name);
	if (!playlist) throw new Error('Cannot get songs, playlist does not exist')

	const songs = playlist.songs.map(x => songsService.getSong(x)).filter((value) => !!value) as Song[];

	return songs;
}

const useIsSongInPlaylist = (trackId: string) => {
	const songsMap = useRecoilValue(playlistSongsState);

	return songsMap.has(trackId);
}

const useRemoveSongFromDefaultPlaylist = () => {
	const [playlists, setPlaylists] = useRecoilState(playlistsState)

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

const useAddSongToDefaultPlaylist = () => {
	const [playlists, setPlaylists] = useRecoilState(playlistsState)

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

export {
	usePlaylistSongs,
	playlistSongsState,
	playlistsState,
	playlistCountState,
	useAddSongToDefaultPlaylist,
	useRemoveSongFromDefaultPlaylist,
	useIsSongInPlaylist
}
