import { atomPlaylists } from "@/features/playlists/recoil";
import { Playlist } from "@/features/playlists/models";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function usePlaylistForm(id?: string) {
	const [playlists, setPlaylists] = useRecoilState<Playlist[]>(atomPlaylists);
	const [name, setName] = useState('');
	const [isDefault, setIsDefault] = useState(true)
	const [defaultSwitchDisabled, setDefaultSwitchDisabled] = useState(false)

	const existingPlaylist = id ? playlists.find((x) => x.id === id) : null;

	if(id && !existingPlaylist) {
		throw new Error(`No playlist found for Id: ${id}`);
	}

	const handleDefaultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsDefault(event.target.checked);
	};

	useEffect(() => {
		if(existingPlaylist) {
			setName(existingPlaylist.name);
			setIsDefault(existingPlaylist.default);
			setDefaultSwitchDisabled(!existingPlaylist.default || playlists.length === 1);
		} else {
			if (playlists.some((x) => x.default)) {
				setIsDefault(false);
				setDefaultSwitchDisabled(true);
			}
		}
	}, []);

	return {
		playlists,
		existingPlaylist,
		name,
		isDefault,
		defaultSwitchDisabled,
		setPlaylists,
		setName,
		handleDefaultChange,	
	}
}