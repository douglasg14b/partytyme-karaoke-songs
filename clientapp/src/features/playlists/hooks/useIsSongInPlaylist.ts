import { useRecoilValue } from "recoil";
import { withPlaylistSongs } from "@/features/playlists/recoil";

export const useIsSongInPlaylist = (trackId: string) => {
	const songsMap = useRecoilValue(withPlaylistSongs);

	return songsMap.has(trackId);
}