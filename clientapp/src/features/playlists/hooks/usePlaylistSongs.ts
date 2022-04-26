import { useRecoilState } from "recoil";
import { atomPlaylists } from "@/features/playlists/recoil";
import { Song, songsService } from "@/features/songs";

export const usePlaylistSongs = (name: string) => {
	const [playlists, setPlaylists] = useRecoilState(atomPlaylists);

	const playlist = playlists.find((x) => x.name === name);
	if (!playlist) throw new Error('Cannot get songs, playlist does not exist')

	const songs = playlist.songs.map(x => songsService.getSong(x)).filter((value) => !!value) as Song[];

	return songs;
}