import { atomPlaylists } from "@/features/playlists/recoil";
import { Playlist } from "@/features/playlists/models";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function usePlaylistForm(name: string) {
	const initialName = name;
	const [playlists, setPlaylists] = useRecoilState<Playlist[]>(atomPlaylists);
	const [isDefault, setIsDefault] = useState(true)
	const [defaultSwitchDisabled, setDefaultSwitchDisabled] = useState(false)

	const handleDefaultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsDefault(event.target.checked);
	};

	useEffect(() => {
		if (playlists.some((x) => x.default)) {
			setIsDefault(false);
			setDefaultSwitchDisabled(true);
		}
	}, []);

	return {
		playlists,
		isDefault,
		defaultSwitchDisabled,
		setPlaylists,
		handleDefaultChange,	
	}
}