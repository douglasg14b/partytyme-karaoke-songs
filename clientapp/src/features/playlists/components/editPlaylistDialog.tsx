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
import { useRecoilState } from 'recoil';
import { Playlist } from '@/features/playlists/models';
import { atomPlaylists } from '@/features/playlists/recoil';
import { useEffect, useState } from 'react';

interface Props {
	playlistName: string
	isOpen: boolean,
	onClose: () => void
}

const usePlaylistForm = (playlistName: string) => {
	const [playlists, setPlaylists] = useRecoilState<Playlist[]>(atomPlaylists);
	const [name, setName] = useState(playlistName)
	const [errorMessage, setErrorMessage] = useState('')

	const [isDefault, setIsDefault] = useState(true)
	const [defaultSwitchDisabled, setDefaultSwitchDisabled] = useState(false)

	useEffect(() => {

		// This is quite an annoying way to do form validation
		// There has  got to be a better way, that more engrained and declarative?
		if (playlists.some((x) => x.name === name)) {
			setErrorMessage("Playlist name already exists");
		} else {
			setErrorMessage("");
		}
	}, [name]);

	return {

	}
}

export default function EditPlaylistDialog({ playlistName, isOpen, onClose }: Props) {
	const [playlists, setPlaylists] = useRecoilState<Playlist[]>(atomPlaylists);
	const [name, setName] = useState(playlistName)
	const [errorMessage, setErrorMessage] = useState('')

	const [isDefault, setIsDefault] = useState(true)
	const [defaultSwitchDisabled, setDefaultSwitchDisabled] = useState(false)

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}

	const onDefaultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsDefault(event.target.checked);
	};

	const handleClose = () => {
		onClose();
	};

	useEffect(() => {

		// This is quite an annoying way to do form validation
		// There has  got to be a better way, that more engrained and declarative?
		if (playlists.some((x) => x.name === name)) {
			setErrorMessage("Playlist name already exists");
		} else {
			setErrorMessage("");
		}
	}, [name]);

	useEffect(() => {
		if (playlists.some((x) => x.default)) {
			setIsDefault(false);
			setDefaultSwitchDisabled(true);
		}
	}, [isOpen])

	const handleSave = () => {
		const newPlaylist: Playlist = {
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
				<TextField
					error={!!errorMessage}
					helperText={errorMessage}
					size='small'
					autoFocus
					margin="dense"
					label="List Name"
					type="text"
					variant="standard"
					onChange={onNameChange}
				/>
				<FormControlLabel control={
					<Switch checked={isDefault} onChange={onDefaultChange} color="warning" disabled={defaultSwitchDisabled} />
				} label="Default" />
			</DialogContent>
			<DialogActions sx={{ py: 1 }}>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave} disabled={!!errorMessage && name.length > 1}>Create</Button>
			</DialogActions>
		</Dialog>
	);
}