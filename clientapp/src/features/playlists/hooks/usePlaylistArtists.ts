import { usePlaylistSongs } from "./usePlaylistSongs";

export const usePlaylistArtists = (name: string) => {
	const songs = usePlaylistSongs(name);
	const artists = Array.from((new Set<string>(songs.map((x) => x.artist))).keys())

	return artists;
}