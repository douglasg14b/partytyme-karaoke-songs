import { useRecoilValue } from "recoil";
import { atomPlaylists } from "@/features/playlists/recoil";
import { Playlist } from "@/features/playlists/models";
import { useFormField } from "@/hooks";
import { useEffect } from "react";

import TextField from '@mui/material/TextField';

interface Props  {
	playlist?: Playlist;
	value: string;
	onError: (error: string | boolean) => void;
	onChange: (value: string) => void
}

export function PlaylistNameField({ playlist, value, onError, onChange }: Props) {
	const playlists = useRecoilValue(atomPlaylists);

	const nameFieldRules = [
		(val: string) => !!val.length || 'Cannot be empty',
		(val: string) => {
			if(val.toLowerCase() === playlist?.name?.toLowerCase()) return true;
			return !playlists.some((x) => x.name.toLowerCase() === val.toLowerCase()) || 'Playlist name already exists'
		}
	];

	const [fieldValue, error, handleNameChange, setValue] = useFormField(value, nameFieldRules)

	useEffect(() => {
		if(playlist) {
			setValue(playlist.name)
		}	
	}, [playlist, setValue])

	useEffect(() => {
		onChange(fieldValue);
	}, [fieldValue, onChange])

	useEffect(() => {
		onError(error);
	}, [error, onError])

	return (
		<TextField
			error={!!error}
			helperText={error}
			size='small'
			autoFocus
			margin="dense"
			label="List Name"
			type="text"
			variant="standard"
			value={fieldValue}
			onChange={handleNameChange}
		/>
	)
}