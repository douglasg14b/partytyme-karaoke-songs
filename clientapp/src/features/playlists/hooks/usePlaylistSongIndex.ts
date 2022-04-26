import { useRecoilValue } from "recoil";
import { atomPlaylists } from "@/features/playlists/recoil";

export const usePlaylistSongIndex = (playlistName: string, songTrackId: string) => {
	const playlists = useRecoilValue(atomPlaylists);
	const playlist = playlists.find((x) => x.name === playlistName);
	if (!playlist) throw new Error('Cannot get songs, playlist does not exist')

	const songIndex = playlist.songs.findIndex((x) => x === songTrackId);

	return songIndex;
}