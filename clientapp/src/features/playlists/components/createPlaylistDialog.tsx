import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRecoilState, useRecoilValue } from 'recoil';
import { Playlist } from '../models/playlist';
import { useEffect, useState } from 'react';
import { atomPlaylists } from '../recoil';
import { useDidMount, useFormField } from '@/hooks';
import { uuidv4 } from '@/_utility';

interface Props {
	isOpen: boolean,
	onClose: () => void
}

function usePlaylistForm(name: string) {
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

interface NameFieldProps  {
	playlist?: Playlist;
	value: string;
	onError: (error: string | boolean) => void;
	onChange: (value: string) => void
}

function PlaylistNameField({ playlist, value, onError, onChange }: NameFieldProps) {
	const playlists = useRecoilValue(atomPlaylists);

	const nameFieldRules = [
		(val: string) => !!val.length || 'Cannot be empty',
		(val: string) => {
			if(val.toLowerCase() === playlist?.name?.toLowerCase()) return true;
			return !playlists.some((x) => x.name.toLowerCase() === val.toLowerCase()) || 'Playlist name already exists'
		}
	];

	const [fieldValue, error, handleNameChange] = useFormField(value, nameFieldRules)

	useEffect(() => {
		onChange(fieldValue);
	}, [fieldValue])

	useEffect(() => {
		onError(error);
	}, [error])

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

export default function CreatePlaylistDialog({ isOpen, onClose }: Props) {
	const [name, setName] = useState('');
	const [error, setError] = useState<string | boolean>('');

	const {
		playlists,
		isDefault,
		defaultSwitchDisabled,
		setPlaylists,
		handleDefaultChange,
	} = usePlaylistForm('');

	const handleClose = () => {
		onClose();
	};

	const handleSave = () => {
		const newPlaylist: Playlist = {
			id: uuidv4(),
			name: name,
			default: isDefault,
			deleted: false,
			songs: []
		}

		setPlaylists([...playlists, newPlaylist])
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth='md' fullWidth>
			<DialogTitle sx={{ textAlign: 'center', pb: 1 }}>Create Playlist</DialogTitle>
			<DialogContent sx={{ pt: 0, pb: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<PlaylistNameField value={name} onError={setError} onChange={setName}/>
				{/* <TextField
					error={!!nameError}
					helperText={nameError}
					size='small'
					autoFocus
					margin="dense"
					label="List Name"
					type="text"
					variant="standard"
					value={nameValue}
					onChange={handleNameChange}
				/> */}
				<FormControlLabel control={
					<Switch checked={isDefault} onChange={handleDefaultChange} color="warning" disabled={defaultSwitchDisabled} />
				} label="Default" />
			</DialogContent>
			<DialogActions sx={{ py: 1 }}>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave} disabled={!!error || !name.length}>Create</Button>
			</DialogActions>
		</Dialog>
	);
}